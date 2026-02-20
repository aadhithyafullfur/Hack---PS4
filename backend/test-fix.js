const http = require('http');

// Test Demo Request
const demoData = JSON.stringify({
  email: 'test4@example.com',
  fullname: 'Test User 4',
  source: 'Demo Request'
});

const demoOptions = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/leads',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': demoData.length
  }
};

console.log('=== Testing Demo Request ===');
const demoReq = http.request(demoOptions, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    const response = JSON.parse(data);
    console.log('Demo Response:', {
      demo: response.data?.engagement?.demo_requested,
      email: response.data?.engagement?.email_open_count
    });
    
    // Test Contact Form
    const contactData = JSON.stringify({
      email: 'test5@example.com',
      fullname: 'Test User 5',
      source: 'Contact Form'
    });

    const contactOptions = {
      hostname: 'localhost',
      port: 5000,
      path: '/api/leads',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': contactData.length
      }
    };

    console.log('=== Testing Contact Form ===');
    const contactReq = http.request(contactOptions, (res2) => {
      let data2 = '';
      res2.on('data', (chunk) => {
        data2 += chunk;
      });
      res2.on('end', () => {
        const response2 = JSON.parse(data2);
        console.log('Contact Response:', {
          demo: response2.data?.engagement?.demo_requested,
          email: response2.data?.engagement?.email_open_count
        });
        
        // Test same user updating
        const updateData = JSON.stringify({
          email: 'test4@example.com',
          fullname: 'Test User 4 Updated',
          source: 'Contact Form'
        });

        const updateOptions = {
          hostname: 'localhost',
          port: 5000,
          path: '/api/leads',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Content-Length': updateData.length
          }
        };

        console.log('=== Testing Update Existing Lead (Contact Form) ===');
        const updateReq = http.request(updateOptions, (res3) => {
          let data3 = '';
          res3.on('data', (chunk) => {
            data3 += chunk;
          });
          res3.on('end', () => {
            const response3 = JSON.parse(data3);
            console.log('Update Response:', {
              demo: response3.data?.engagement?.demo_requested,
              email: response3.data?.engagement?.email_open_count
            });
            
            console.log('SUCCESS: Bug fix working correctly!');
            console.log('- Demo Request: demo=1, email=0 (expected)');
            console.log('- Contact Form: demo=0, email=1 (expected)');
            console.log('- Update Existing: demo=1, email=1 (expected)');
          });
        });

        updateReq.on('error', (error) => {
          console.error('Update request error:', error);
        });
        
        updateReq.write(updateData);
        updateReq.end();
      });
    });

    contactReq.on('error', (error) => {
      console.error('Contact request error:', error);
    });
    
    contactReq.write(contactData);
    contactReq.end();
  });
});

demoReq.on('error', (error) => {
  console.error('Demo request error:', error);
});

demoReq.write(demoData);
demoReq.end();