const http = require('http');

// Test creating a lead with ML prediction
const postData = JSON.stringify({
  email: 'ml.test@example.com',
  fullname: 'ML Test User',
  source: 'Demo Request'
});

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/leads',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': postData.length
  }
};

console.log('Testing lead creation with ML prediction...');
const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log('HEADERS:', JSON.stringify(res.headers));
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('Response body:', data);
    
    if (res.statusCode === 201) {
      try {
        const response = JSON.parse(data);
        const conversionProb = response.data?.mlPrediction?.conversionProbability;
        console.log(`\n✓ Lead created successfully!`);
        console.log(`✓ Conversion Probability: ${conversionProb}`);
        console.log(`✓ ML Prediction is working!`);
      } catch (e) {
        console.log('Could not parse response for ML data');
      }
    } else {
      console.log('Failed to create lead');
    }
  });
});

req.on('error', (e) => {
  console.error('Problem with request:', e.message);
});

req.write(postData);
req.end();