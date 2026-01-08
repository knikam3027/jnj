export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  ssoUrl: 'http://localhost:3000/auth/sso',
  useMockData: true, // Using mock data for local development
  aiProvider: 'python', // default to python for local dev chat
  pythonChatUrl: 'http://localhost:8506/invocations'
};
