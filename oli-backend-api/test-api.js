// Test script for all API endpoints
// Run with: node test-api.js

const baseUrl = 'http://localhost:3000';

let accessToken = '';
let refreshToken = '';

async function testAPI(method, endpoint, data = null, headers = {}) {
  const url = `${baseUrl}${endpoint}`;
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers
    }
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    
    console.log(`\n✅ ${method} ${endpoint}`);
    console.log('Status:', response.status);
    console.log('Response:', JSON.stringify(result, null, 2));
    
    return result;
  } catch (error) {
    console.log(`\n❌ ${method} ${endpoint}`);
    console.log('Error:', error.message);
    return null;
  }
}

async function runTests() {
  console.log('🧪 Testing OLI Backend API\n');
  console.log('=' .repeat(60));

  // 1. Health Check
  console.log('\n📍 1. HEALTH CHECK');
  console.log('-'.repeat(60));
  await testAPI('GET', '/health');

  // 2. Register (Create Profile)
  console.log('\n📍 2. REGISTRATION (Create Profile)');
  console.log('-'.repeat(60));
  const registerData = {
    email: 'admin@jnj.com',
    password: 'admin',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin'
  };
  const registerResult = await testAPI('POST', '/api/auth/register', registerData);

  // 3. Login (Sign-In)
  console.log('\n📍 3. LOGIN (Sign-In)');
  console.log('-'.repeat(60));
  const loginData = {
    email: 'admin@jnj.com',
    password: 'admin'
  };
  const loginResult = await testAPI('POST', '/api/auth/login', loginData);
  
  if (loginResult && loginResult.accessToken) {
    accessToken = loginResult.accessToken;
    refreshToken = loginResult.refreshToken;
    console.log('✅ Tokens saved for subsequent requests');
  }

  // 4. Get Profile
  console.log('\n📍 4. GET PROFILE');
  console.log('-'.repeat(60));
  await testAPI('GET', '/api/users/me', null, {
    'Authorization': `Bearer ${accessToken}`
  });

  // 5. Update Profile
  console.log('\n📍 5. UPDATE PROFILE');
  console.log('-'.repeat(60));
  const updateData = {
    firstName: 'Admin',
    lastName: 'Updated',
    role: 'admin'
  };
  await testAPI('PATCH', '/api/users/me', updateData, {
    'Authorization': `Bearer ${accessToken}`
  });

  // 6. Token Refresh
  console.log('\n📍 6. TOKEN REFRESH');
  console.log('-'.repeat(60));
  const refreshData = {
    refreshToken: refreshToken
  };
  const refreshResult = await testAPI('POST', '/api/auth/refresh', refreshData);
  
  if (refreshResult && refreshResult.accessToken) {
    accessToken = refreshResult.accessToken;
    console.log('✅ New access token received');
  }

  // 7. Get Chat History
  console.log('\n📍 7. GET CHAT HISTORY');
  console.log('-'.repeat(60));
  await testAPI('GET', '/api/chat/history', null, {
    'Authorization': `Bearer ${accessToken}`
  });

  // 8. Send Message
  console.log('\n📍 8. SEND MESSAGE');
  console.log('-'.repeat(60));
  const messageData = {
    message: 'What is the current revenue?'
  };
  const messageResult = await testAPI('POST', '/api/chat/message', messageData, {
    'Authorization': `Bearer ${accessToken}`
  });

  // 9. Logout (Sign-Out)
  console.log('\n📍 9. LOGOUT (Sign-Out)');
  console.log('-'.repeat(60));
  const logoutData = {
    refreshToken: refreshToken
  };
  await testAPI('POST', '/api/auth/logout', logoutData, {
    'Authorization': `Bearer ${accessToken}`
  });

  console.log('\n' + '='.repeat(60));
  console.log('✅ All API tests completed!');
  console.log('='.repeat(60) + '\n');
}

// Run tests
runTests().catch(console.error);
