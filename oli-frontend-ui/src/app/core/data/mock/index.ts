/**
 * Mock Data Barrel Export
 * Central export point for all mock data
 */

export * from './users.mock';
export * from './chat-sessions.mock';
export * from './settings.mock';
export * from './api-responses.mock';
export * from './analytics.mock';

// Re-export for backward compatibility
import { mockUsers } from './users.mock';
import { mockChatSessions } from './chat-sessions.mock';
import { mockSettings, mockLanguages, mockThemes, mockHelpTopics } from './settings.mock';
import { mockAIResponses, mockErrorResponses, mockSuccessMessages } from './api-responses.mock';
import { mockAnalytics, mockChartData } from './analytics.mock';

export const MOCK_DATA = {
  users: mockUsers,
  chatSessions: mockChatSessions,
  settings: mockSettings,
  languages: mockLanguages,
  themes: mockThemes,
  helpTopics: mockHelpTopics,
  aiResponses: mockAIResponses,
  errorResponses: mockErrorResponses,
  successMessages: mockSuccessMessages,
  analytics: mockAnalytics,
  chartData: mockChartData
};
