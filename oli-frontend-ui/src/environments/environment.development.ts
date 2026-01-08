export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  ssoUrl: 'http://localhost:3000/auth/sso',
  useMockData: false, // ✅ Using real backend now
  aiProvider: 'python', // 'python' | 'node' (backend)
  pythonChatUrl: 'http://localhost:8506/invocations'
};
