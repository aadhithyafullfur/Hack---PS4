const Lead = require('../models/Lead');
const {
  updateLeadPrediction,
  calculateFeatures,
  updateAllLeadsPredictions: updateAllLeadsPredictionsUtil
} = require('../utils/mlPrediction');

// Whitelist of allowed engagement fields to prevent injection
const ALLOWED_ENGAGEMENT_FIELDS = [
    'email_open_count',
    'website_visits',
    'pricing_page_click',
    'demo_requested'
];

exports.updateEngagement = async (req, res) => {
    try {
        const { id } = req.params;
        const { field } = req.body;

        // 1. Validate field name (Whitelist check)
        if (!ALLOWED_ENGAGEMENT_FIELDS.includes(field)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid engagement field specified',
                allowedFields: ALLOWED_ENGAGEMENT_FIELDS
            });
        }

        // 2. Perform the atomic update using $inc
        const updatedLead = await Lead.findByIdAndUpdate(
            id,
            { $inc: { [`engagement.${field}`]: 1 } },
            { new: true, runValidators: true }
        );

        // 3. Check if lead exists
        if (!updatedLead) {
            return res.status(404).json({
                success: false,
                message: 'Lead not found'
            });
        }

        // 4. Return success response
        res.status(200).json({
            success: true,
            data: updatedLead
        });

    } catch (error) {
        console.error('Engagement Update Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while updating engagement'
        });
    }
};

exports.trackEmailOpen = async (req, res) => {
    try {
        const { id } = req.params;

        await Lead.findByIdAndUpdate(
            id,
            { $inc: { 'engagement.email_open_count': 1 } }
        );

        // Return a 1x1 transparent pixel
        const buffer = Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64');
        res.writeHead(200, {
            'Content-Type': 'image/gif',
            'Content-Length': buffer.length,
            'Cache-Control': 'no-store, no-cache, must-revalidate, private'
        });
        res.end(buffer);
    } catch (error) {
        // Even on error, return the pixel so the email doesn't show a broken image
        const buffer = Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64');
        res.writeHead(200, {
            'Content-Type': 'image/gif',
            'Content-Length': buffer.length
        });
        res.end(buffer);
    }
};

exports.createLead = async (req, res) => {
    try {
        const { fullname, email, company, industry, message, source } = req.body;

        let lead = await Lead.findOne({ email });

        if (lead) {
            // Update existing lead if they applied again
            lead.name = fullname || lead.name;
            lead.company = company || lead.company;
            lead.service = industry || lead.service;
            lead.message = message || lead.message;
            if (source) lead.source = source;
            await lead.save();
        } else {
            // Create new lead
            lead = await Lead.create({
                name: fullname || 'Unknown',
                email,
                company,
                service: industry,
                message,
                source: source || 'Demo Request',
                status: 'New'
            });
        }

        // Determine engagement field to increment based on source
        let engagementField = 'demo_requested'; // default
        if (source === 'Contact Form') {
            engagementField = 'email_open_count';
        } else if (source === 'Demo Request') {
            engagementField = 'demo_requested';
        } else if (source === 'Signup') {
            engagementField = 'email_open_count';
        } else {
            engagementField = 'website_visits'; // for 'Website' or other sources
        }

        // Track engagement based on source type
        lead = await Lead.findByIdAndUpdate(
            lead._id,
            { $inc: { [`engagement.${engagementField}`]: 1 } },
            { new: true }
        );

        // Update ML prediction based on new engagement data
        try {
            await updateLeadPrediction(lead._id);
            // Fetch the updated lead with new prediction
            lead = await Lead.findById(lead._id);
        } catch (predError) {
            console.error('Error updating ML prediction:', predError.message);
            // Continue with response even if prediction update fails
        }

        res.status(201).json({
            success: true,
            data: lead
        });
    } catch (error) {
        console.error('Create Lead Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while creating lead'
        });
    }
};

exports.getLead = async (req, res) => {
    try {
        const { id } = req.params;
        const lead = await Lead.findById(id);

        if (!lead) {
            return res.status(404).json({
                success: false,
                message: 'Lead not found'
            });
        }

        res.status(200).json({
            success: true,
            data: lead
        });
    } catch (error) {
        console.error('Get Lead Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching lead'
        });
    }
};

// Endpoint to update ML prediction for a specific lead
exports.updateLeadPrediction = async (req, res) => {
    try {
        const { id } = req.params;
        
        const lead = await updateLeadPrediction(id);
        
        res.status(200).json({
            success: true,
            data: lead,
            message: 'Lead prediction updated successfully'
        });
    } catch (error) {
        console.error('Update Lead Prediction Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while updating lead prediction',
            error: error.message
        });
    }
};

// Endpoint to update ML predictions for all leads
exports.updateAllLeadsPredictions = async (req, res) => {
    try {
        const results = await updateAllLeadsPredictionsUtil();
        
        res.status(200).json({
            success: true,
            count: results.length,
            message: `Successfully updated predictions for ${results.length} leads`
        });
    } catch (error) {
        console.error('Update All Leads Predictions Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while updating all leads predictions',
            error: error.message
        });
    }
};

exports.getLeads = async (req, res) => {
    try {
        const leads = await Lead.find().sort({ createdAt: -1 }); // Newest first
        res.status(200).json({
            success: true,
            data: leads
        });
    } catch (error) {
        console.error('Get Leads Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching leads'
        });
    }
};
