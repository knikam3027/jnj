/**
 * Mock User Data
 * Simulates user profiles and authentication data
 */

export const mockUsers = [
  {
    id: '1',
    email: 'johnsmith@jis.jnj.com',
    name: 'John Smith',
    avatar: '',
    role: 'Admin',
    department: 'Operations',
    preferences: {
      language: 'English',
      theme: 'light',
      notifications: true,
      emailUpdates: true
    },
    createdAt: '2024-01-15T08:00:00.000Z',
    lastLogin: '2025-12-25T09:30:00.000Z'
  },
  {
    id: '2',
    email: 'test@example.com',
    name: 'Test User',
    avatar: '',
    role: 'User',
    department: 'Analytics',
    preferences: {
      language: 'English',
      theme: 'light',
      notifications: true,
      emailUpdates: false
    },
    createdAt: '2024-03-20T10:00:00.000Z',
    lastLogin: '2025-12-24T15:45:00.000Z'
  },
  {
    id: '3',
    email: 'maria.silva@jnj.com',
    name: 'Maria Silva',
    avatar: '',
    role: 'Manager',
    department: 'Supply Chain',
    preferences: {
      language: 'Portuguese',
      theme: 'light',
      notifications: true,
      emailUpdates: true
    },
    createdAt: '2024-02-10T12:00:00.000Z',
    lastLogin: '2025-12-23T11:20:00.000Z'
  }
];

export const mockAuthTokens = {
  accessToken: 'mock-access-token-eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
  refreshToken: 'mock-refresh-token-eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
  expiresIn: 3600,
  tokenType: 'Bearer'
};
