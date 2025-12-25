# Mock Data Documentation

Complete mock data structure for frontend development without backend dependency.

## 📁 Folder Structure

```
src/app/core/data/mock/
├── index.ts                    # Barrel exports (import everything from here)
├── users.mock.ts              # User profiles & authentication
├── chat-sessions.mock.ts      # Chat conversations & messages
├── settings.mock.ts           # App settings, languages, themes, help
├── api-responses.mock.ts      # AI responses & error messages
└── analytics.mock.ts          # Business metrics & charts
```

## 🚀 Usage

### Import Mock Data

```typescript
// Import everything
import { MOCK_DATA } from '@app/core/data/mock';

// Or import specific exports
import { mockUsers, mockChatSessions, mockSettings } from '@app/core/data/mock';
```

### Available Mock Data

#### 1. Users (`users.mock.ts`)
```typescript
MOCK_DATA.users          // Array of 3 mock users
MOCK_DATA.users[0]       // Default logged-in user (John Smith)
```

**User Object Structure:**
- `id`: User ID
- `email`: Email address
- `name`: Full name
- `avatar`: Avatar URL (empty string)
- `role`: 'Admin' | 'Manager' | 'User'
- `department`: User's department
- `preferences`: Language, theme, notifications
- `createdAt`: Account creation date
- `lastLogin`: Last login timestamp

#### 2. Chat Sessions (`chat-sessions.mock.ts`)
```typescript
MOCK_DATA.chatSessions   // Array of 3 conversation threads
```

**Session Object Structure:**
- `id`: Session ID
- `title`: Conversation title (truncated)
- `createdAt`: Creation timestamp
- `updatedAt`: Last update timestamp
- `messages`: Array of message objects
  - `id`: Message ID
  - `content`: Message text
  - `sender`: 'user' | 'bot'
  - `timestamp`: Message timestamp
  - `isEditable`: Boolean (user messages only)

#### 3. Settings (`settings.mock.ts`)
```typescript
MOCK_DATA.settings       // Application settings object
MOCK_DATA.languages      // Available languages (8 options)
MOCK_DATA.themes         // Available themes (light, dark, auto)
MOCK_DATA.helpTopics     // Help categories & articles
```

**Settings Categories:**
- `general`: Language, timezone, date/time format
- `notifications`: Email, push, desktop, chat alerts
- `privacy`: Analytics, usage data, cookies
- `appearance`: Theme, font size, compact mode
- `chat`: Auto-save, history retention, timestamps
- `ai`: Model, temperature, response length

**Languages:**
- English 🇺🇸
- Portuguese 🇧🇷
- Spanish 🇪🇸
- French 🇫🇷
- German 🇩🇪
- Italian 🇮🇹
- Japanese 🇯🇵
- Chinese 🇨🇳

#### 4. API Responses (`api-responses.mock.ts`)
```typescript
MOCK_DATA.aiResponses         // Smart AI responses by topic
MOCK_DATA.errorResponses      // Error messages
MOCK_DATA.successMessages     // Success messages
```

**AI Response Topics:**
- `greeting` - Welcome message
- `revenue` - Financial metrics
- `customer` - Customer analytics
- `returns` - Return analysis
- `orders` - Order statistics
- `inventory` - Stock levels
- `performance` - KPI dashboard
- `forecast` - Future predictions
- `help` - Feature overview

**Error Types:**
- `notFound` - Data not found
- `serverError` - Server issues
- `unauthorized` - Permission denied
- `timeout` - Request timeout

**Success Messages:**
- `sessionCreated` - New chat created
- `sessionDeleted` - Chat deleted
- `profileUpdated` - Profile saved
- `settingsSaved` - Settings saved
- `feedbackSubmitted` - Feedback sent
- `exportComplete` - Export finished

#### 5. Analytics (`analytics.mock.ts`)
```typescript
MOCK_DATA.analytics      // Business metrics & KPIs
MOCK_DATA.chartData      // Chart datasets
```

**Analytics Data:**
- `dashboard`: Revenue, orders, customers, satisfaction
- `revenueByMonth`: 12-month revenue trend
- `topProducts`: Top 5 selling products
- `customerSegments`: Enterprise, Mid-Market, SMB
- `returnsAnalysis`: Return rates & reasons
- `geographicData`: Revenue by country

**Chart Data:**
- `revenueTrend`: Line chart (2024 vs 2025)
- `categoryBreakdown`: Pie chart (5 categories)

## 🔌 Mock API Interceptor

The `mock-api.interceptor.ts` automatically intercepts HTTP requests when `useMockData: true` in environment.

### Supported Endpoints

#### Authentication
- `POST /api/auth/login` → Returns user + tokens
- `POST /api/auth/register` → Creates new user
- `POST /api/auth/refresh` → Refreshes access token
- `POST /api/auth/logout` → Logs out user

#### User Management
- `GET /api/users/profile` → Returns current user
- `PUT /api/users/profile` → Updates user profile
- `GET /api/users/settings` → Returns app settings
- `PUT /api/users/settings` → Saves settings

#### Chat
- `GET /api/chat/sessions` → Returns all sessions
- `GET /api/chat/sessions/:id` → Returns specific session
- `POST /api/chat/sessions` → Creates new session
- `POST /api/chat/sessions/:id/messages` → Sends message
- `DELETE /api/chat/sessions/:id` → Deletes session

#### Analytics
- `GET /api/analytics/dashboard` → Returns KPIs

#### Help & Settings
- `GET /api/help/topics` → Returns help topics
- `GET /api/settings/languages` → Returns languages
- `GET /api/settings/themes` → Returns themes

### Response Format

All mock responses follow this structure:

```typescript
{
  success: boolean,
  data?: any,
  message?: string,
  error?: string
}
```

### Network Simulation

- Random delay: 300-800ms per request
- Simulates realistic network latency
- Extra delay for AI responses (+1500ms)

## 🎯 Smart AI Responses

The mock AI detects keywords and returns contextual responses:

| Keywords | Response Type |
|----------|--------------|
| hello, hi | Greeting |
| revenue, sales | Financial metrics |
| customer, client | Customer analytics |
| return, refund, refusal | Return analysis |
| order, purchase | Order statistics |
| inventory, stock | Stock levels |
| performance, dashboard, metric | KPI dashboard |
| forecast, prediction, future | Predictions |
| help, what can you | Feature overview |
| _anything else_ | Generic data response |

## 🔄 Enable/Disable Mock Data

### Development (Enable Mock)
```typescript
// src/environments/environment.development.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  useMockData: true  // ✅ Mock enabled
};
```

### Production (Real Backend)
```typescript
// src/environments/environment.ts
export const environment = {
  production: true,
  apiUrl: 'https://oli.jnj.com/api',
  useMockData: false  // ❌ Mock disabled
};
```

## 📝 Adding New Mock Data

### 1. Create New Mock File

```typescript
// src/app/core/data/mock/new-feature.mock.ts
export const mockNewFeature = {
  // Your mock data here
};
```

### 2. Add to Barrel Export

```typescript
// src/app/core/data/mock/index.ts
export * from './new-feature.mock';

// Update MOCK_DATA
export const MOCK_DATA = {
  // ... existing
  newFeature: mockNewFeature
};
```

### 3. Add Interceptor Route

```typescript
// src/app/core/interceptors/mock-api.interceptor.ts
if (url.includes('/new-feature') && req.method === 'GET') {
  return of(new HttpResponse({
    status: 200,
    body: {
      success: true,
      data: MOCK_DATA.newFeature
    }
  })).pipe(delay(networkDelay));
}
```

## ✅ Complete UI Features with Mock Data

All UI features work without backend:

- ✅ **Authentication** - Login, register, logout
- ✅ **Chat** - Create sessions, send messages, get AI responses
- ✅ **Chat History** - View past conversations
- ✅ **User Profile** - View and edit profile
- ✅ **Settings** - All settings categories
- ✅ **Language Switcher** - 8 languages
- ✅ **Theme Switcher** - Light/Dark/Auto
- ✅ **Help** - Help topics and articles
- ✅ **Analytics** - Business metrics (ready for integration)

## 🎨 UI Components Using Mock Data

Components that consume mock data:

1. **Login Component** - Uses `mockUsers` for authentication
2. **Chat Components** - Uses `mockChatSessions` for conversations
3. **Settings Component** - Uses `mockSettings`, `mockLanguages`, `mockThemes`
4. **Profile Component** - Uses `mockUsers[0]` for user data
5. **Help Component** - Uses `mockHelpTopics` for help content

## 🚀 Testing

Test your app with mock data:

```bash
# Start dev server with mock enabled
ng serve

# Open browser (mock API active)
http://localhost:4200

# Try these:
1. Login with any email/password
2. Create new chat
3. Ask: "What's our revenue?"
4. Open Settings → Change language
5. View Help topics
6. Edit profile
```

## 📊 Data Statistics

- **Total Mock Users:** 3
- **Total Chat Sessions:** 3
- **Total Messages:** 6
- **AI Response Templates:** 9
- **Languages:** 8
- **Themes:** 3
- **Help Topics:** 4 (with multiple articles)
- **Analytics Metrics:** 30+
- **Supported API Endpoints:** 15+

---

**Status:** ✅ Complete - All UI features functional without backend
**Last Updated:** December 25, 2025
