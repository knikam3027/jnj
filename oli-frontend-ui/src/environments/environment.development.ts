export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  ssoUrl: 'http://localhost:3000/api/auth/sso',
  useMockData: false, // ✅ Using real backend now
  aiProvider: 'node', // 'python' | 'node' (backend) - Using node which has mock fallback
  pythonChatUrl: 'http://localhost:8506/invocations'
};
