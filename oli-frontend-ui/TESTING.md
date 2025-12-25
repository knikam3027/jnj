# OLI Frontend - Testing Guide

## 🚀 Quick Start (No Backend Required!)

The frontend now works in **MOCK MODE** with example data - perfect for testing!

### Step 1: Start the Application
```bash
npm start
```
Open: http://localhost:4200/

### Step 2: Test Login Page
- Enter any email (e.g., `johnsmith@jis.jnj.com` or `test@example.com`)
- Click "Sign in via SSO"
- ✅ You'll be automatically logged in and redirected to chat

### Step 3: Test Chat Features

#### Available Pages/Routes:
1. **Login Page**: `/login`
2. **Chat Page**: `/chat` (default after login)
3. **Specific Chat**: `/chat/:id`

#### What You Can Test:

✅ **Login Flow**
- Email input validation
- Mock SSO authentication
- Automatic redirect to chat

✅ **Chat Interface**
- Welcome message on new chat
- Send messages (get mock AI responses)
- View chat history in sidebar
- Create new chat
- Switch between chat sessions
- View previous chats (sorted by Today/Previous)

✅ **User Profile**
- User name displayed in header
- Logout functionality

✅ **Message Features**
- User messages (with edit/copy icons)
- Bot responses (with copy/download/refresh icons)
- Loading state (thinking animation)
- Timestamp display

## 📁 Mock Data

Example chat sessions are loaded from:
`src/app/core/data/mock-data.json`

You can edit this file to add more:
- Users
- Chat sessions
- Mock responses

## ⚙️ Environment Configuration

**Development Mode (Current)**:
- File: `src/environments/environment.development.ts`
- `useMockData: true` ← Frontend works standalone

**Production Mode** (When backend is ready):
- File: `src/environments/environment.ts`
- `useMockData: false` ← Connects to real API

## 🔄 Switch to Real Backend

When your Node.js backend is ready:

1. Set `useMockData: false` in `environment.development.ts`
2. Update `apiUrl` to your backend URL
3. Restart the app

## 🎨 Test All Features

1. **Login**: Enter email → Auto login → Redirect to chat
2. **New Chat**: Click "New Chat" button → Empty chat screen
3. **Send Message**: Type message → Click send → See bot response
4. **Chat History**: Click on previous chats in sidebar
5. **Logout**: Click logout → Return to login page
6. **Profile**: See your name in header

## 📝 Example Test Emails

Try these emails (all work in mock mode):
- `johnsmith@jis.jnj.com` → John Smith
- `test@example.com` → Test User
- Any email → Uses first mock user

## 🎯 Current Routes

| Route | Description |
|-------|-------------|
| `/login` | SSO Login page |
| `/chat` | Main chat interface (protected) |
| `/chat/:id` | Specific chat session (protected) |
| `/**` | Redirects to `/chat` |

Protected routes require authentication (automatic in mock mode).
