const { execFile } = require('child_process');
const path = require('path');
const util = require('util');
const Lead = require('../models/Lead');

const execFileAsync = util.promisify(execFile);

/**
 * Calculate ML features from engagement data
 */
function calculateFeatures(engagement) {
  if (!engagement) {
    return {
      emailEngagement: 0,
      visitFrequency: 0,
      pricingInterest: 0,
      demoInterest: 0
    };
  }

  // Calculate features based on engagement data
  const features = {
    // Email engagement: weighted sum of email-related activities
    emailEngagement: (engagement.email_open_count || 0) * 0.3,
    
    // Visit frequency: normalized by time since first visit
    visitFrequency: (engagement.website_visits || 0) * 0.2,
    
    // Pricing interest: weighted sum of pricing page views
    pricingInterest: (engagement.pricing_page_click || 0) * 0.4,
    
    // Demo interest: weighted sum of demo requests
    demoInterest: (engagement.demo_requested || 0) * 0.5
  };

  return features;
}

/**
 * Predict conversion probability for a single lead using Python ML model
 */
async function predictConversionProbability(lead) {
  try {
    // Calculate features from lead's engagement data
    const features = calculateFeatures(lead.engagement);

    // Prepare data for Python script
    const inputData = JSON.stringify([features]);

    // Path to the Python script
    const scriptPath = path.join(__dirname, 'predict_conversion.py');

    // Execute Python script
    const { stdout } = await execFileAsync('python', [scriptPath, inputData], {
      timeout: 10000, // 10 second timeout
      maxBuffer: 1024 * 1024 // 1MB max buffer
    });

    const result = JSON.parse(stdout);

    if (!result.success) {
      console.error('ML Prediction Error:', result.error);
      // Return default probability if prediction fails
      return 0.1; // 10% default
    }

    // Return the first prediction (for single lead)
    return result.predictions[0] || 0.1;
  } catch (error) {
    console.error('Error predicting conversion probability:', error.message);
    // Return default probability if anything goes wrong
    return 0.1; // 10% default
  }
}

/**
 * Predict conversion probabilities for multiple leads
 */
async function predictMultipleConversionProbabilities(leads) {
  try {
    // Calculate features for all leads
    const featuresList = leads.map(lead => calculateFeatures(lead.engagement));

    // Prepare data for Python script
    const inputData = JSON.stringify(featuresList);

    // Path to the Python script
    const scriptPath = path.join(__dirname, 'predict_conversion.py');

    // Execute Python script
    const { stdout } = await execFileAsync('python', [scriptPath, inputData], {
      timeout: 30000, // 30 second timeout for batch processing
      maxBuffer: 10 * 1024 * 1024 // 10MB max buffer for larger batches
    });

    const result = JSON.parse(stdout);

    if (!result.success) {
      console.error('Batch ML Prediction Error:', result.error);
      // Return default probabilities if prediction fails
      return leads.map(() => 0.1);
    }

    // Ensure we return the right number of predictions
    const predictions = result.predictions || [];
    while (predictions.length < leads.length) {
      predictions.push(0.1); // Fill with default if needed
    }

    return predictions.slice(0, leads.length);
  } catch (error) {
    console.error('Error predicting multiple conversion probabilities:', error.message);
    // Return default probabilities if anything goes wrong
    return leads.map(() => 0.1);
  }
}

/**
 * Update a single lead's ML prediction
 */
async function updateLeadPrediction(leadId) {
  try {
    const lead = await Lead.findById(leadId);
    if (!lead) {
      throw new Error('Lead not found');
    }

    // Calculate new prediction
    const probability = await predictConversionProbability(lead);

    // Update the lead with new prediction
    const updatedLead = await Lead.findByIdAndUpdate(
      leadId,
      {
        $set: {
          'mlPrediction.conversionProbability': Math.max(0, Math.min(1, probability)),
          'mlPrediction.lastPredicted': new Date(),
          'mlPrediction.features': calculateFeatures(lead.engagement),
          'mlPrediction.predictedScore': probability * 100, // Scale to 0-100
          'mlPrediction.qualityGrade': getQualityGrade(probability)
        }
      },
      { new: true }
    );

    return updatedLead;
  } catch (error) {
    console.error('Error updating lead prediction:', error.message);
    throw error;
  }
}

/**
 * Update predictions for all leads
 */
async function updateAllLeadsPredictions() {
  try {
    const leads = await Lead.find({});
    
    // Get predictions for all leads at once (more efficient)
    const probabilities = await predictMultipleConversionProbabilities(leads);

    // Update all leads in parallel (with concurrency control)
    const updatePromises = leads.map((lead, index) => {
      return Lead.findByIdAndUpdate(
        lead._id,
        {
          $set: {
            'mlPrediction.conversionProbability': Math.max(0, Math.min(1, probabilities[index])),
            'mlPrediction.lastPredicted': new Date(),
            'mlPrediction.features': calculateFeatures(lead.engagement),
            'mlPrediction.predictedScore': probabilities[index] * 100, // Scale to 0-100
            'mlPrediction.qualityGrade': getQualityGrade(probabilities[index])
          }
        },
        { new: true }
      );
    });

    const results = await Promise.all(updatePromises);
    return results;
  } catch (error) {
    console.error('Error updating all leads predictions:', error.message);
    throw error;
  }
}

/**
 * Determine quality grade based on conversion probability
 */
function getQualityGrade(probability) {
  if (probability >= 0.7) return 'Hot';
  if (probability >= 0.4) return 'Warm';
  if (probability >= 0.1) return 'Cold';
  return 'Unknown';
}

module.exports = {
  calculateFeatures,
  predictConversionProbability,
  predictMultipleConversionProbabilities,
  updateLeadPrediction,
  updateAllLeadsPredictions,
  getQualityGrade
};