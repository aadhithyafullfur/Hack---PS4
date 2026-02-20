const axios = require('axios');

async function testLeadCreation() {
  try {
    console.log('=== Testing Demo Request ===');
    const demoResponse = await axios.post('http://localhost:5000/api/leads', {
      email: 'test1@example.com',
      fullname: 'Test User 1',
      source: 'Demo Request'
    });
    console.log('Demo Request Response:', demoResponse.data);
    
    console.log('\n=== Testing Contact Form ===');
    const contactResponse = await axios.post('http://localhost:5000/api/leads', {
      email: 'test2@example.com',
      fullname: 'Test User 2',
      source: 'Contact Form'
    });
    console.log('Contact Form Response:', contactResponse.data);
    
    console.log('\n=== Checking Lead Data ===');
    const leadsResponse = await axios.get('http://localhost:5000/api/leads');
    const leads = leadsResponse.data.data;
    
    console.log('\nAll Leads:');
    leads.forEach(lead => {
      console.log(`Email: ${lead.email}`);
      console.log(`  Source: ${lead.source}`);
      console.log(`  Lead Source Types: ${JSON.stringify(lead.leadSourceType)}`);
      console.log(`  Demo Requests: ${lead.engagement?.demo_requested || 0}`);
      console.log(`  Email Opens: ${lead.engagement?.email_open_count || 0}`);
      console.log('---');
    });
    
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}

testLeadCreation();