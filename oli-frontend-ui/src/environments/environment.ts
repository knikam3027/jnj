export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  ssoUrl: 'http://localhost:3000/api/auth/sso',
  useMockData: false, // ✅ Using real backend 
  aiProvider: 'python', // Use Python backend directly
  pythonChatUrl: 'http://localhost:8506/invocations'
};
