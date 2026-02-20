const { execFile } = require('child_process');
const util = require('util');
const execFileAsync = util.promisify(execFile);

async function testMLPrediction() {
  try {
    const testData = {
      emailEngagement: 2,
      visitFrequency: 5,
      pricingInterest: 3,
      demoInterest: 1
    };
    
    const result = await execFileAsync('python', [
      'utils/predict_conversion.py',
      JSON.stringify(testData)
    ]);
    
    console.log('Python script output:', result.stdout);
    console.log('Error output:', result.stderr);
  } catch (error) {
    console.error('Error executing Python script:', error.message);
    console.error('Stderr:', error.stderr);
  }
}

testMLPrediction();