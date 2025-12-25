/**
 * Mock Settings Data
 * Application configuration and user preferences
 */

export const mockSettings = {
  general: {
    language: 'English',
    timezone: 'America/New_York',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12h'
  },
  notifications: {
    emailNotifications: true,
    pushNotifications: true,
    desktopNotifications: false,
    chatNotifications: true,
    weeklyDigest: true
  },
  privacy: {
    shareAnalytics: true,
    shareUsageData: false,
    allowCookies: true
  },
  appearance: {
    theme: 'light', // 'light', 'dark', 'auto'
    fontSize: 'medium', // 'small', 'medium', 'large'
    compactMode: false,
    showAvatars: true
  },
  chat: {
    autoSave: true,
    saveHistory: true,
    maxHistoryDays: 90,
    showTimestamps: true,
    enableMarkdown: true,
    codeHighlighting: true
  },
  ai: {
    model: 'gpt-4',
    temperature: 0.7,
    maxTokens: 2000,
    responseLength: 'balanced', // 'concise', 'balanced', 'detailed'
    enableContextMemory: true
  }
};

export const mockLanguages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'pt', name: 'Portuguese', flag: '🇧🇷' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸' },
  { code: 'fr', name: 'French', flag: '🇫🇷' },
  { code: 'de', name: 'German', flag: '🇩🇪' },
  { code: 'it', name: 'Italian', flag: '🇮🇹' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
  { code: 'zh', name: 'Chinese', flag: '🇨🇳' }
];

export const mockThemes = [
  { id: 'light', name: 'Light', description: 'Clean and bright interface' },
  { id: 'dark', name: 'Dark', description: 'Easy on the eyes' },
  { id: 'auto', name: 'Auto', description: 'Follow system preferences' }
];

export const mockHelpTopics = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    icon: '🚀',
    description: 'Learn the basics of OLI',
    articles: [
      'How to create your first chat',
      'Understanding AI responses',
      'Managing chat history',
      'Customizing your profile'
    ]
  },
  {
    id: 'features',
    title: 'Features',
    icon: '⚡',
    description: 'Explore powerful features',
    articles: [
      'Advanced search capabilities',
      'Data visualization',
      'Export and sharing',
      'Keyboard shortcuts'
    ]
  },
  {
    id: 'troubleshooting',
    title: 'Troubleshooting',
    icon: '🔧',
    description: 'Common issues and solutions',
    articles: [
      'Login problems',
      'Chat not responding',
      'Data not loading',
      'Performance issues'
    ]
  },
  {
    id: 'security',
    title: 'Security & Privacy',
    icon: '🔒',
    description: 'Your data protection',
    articles: [
      'Data encryption',
      'Privacy policy',
      'Account security',
      'Compliance information'
    ]
  }
];
