# OLI - Operational Learning Intelligence

Angular frontend application for enterprise chat assistant with SSO authentication.

## Project Structure

```
src/
├── app/
│   ├── core/                    # Core module (singleton services, guards, interceptors)
│   │   ├── guards/
│   │   │   └── auth.guard.ts
│   │   ├── interceptors/
│   │   │   └── auth.interceptor.ts
│   │   ├── models/
│   │   │   ├── auth.model.ts
│   │   │   └── chat.model.ts
│   │   └── services/
│   │       ├── auth.service.ts
│   │       └── chat.service.ts
│   ├── features/                # Feature modules
│   │   ├── auth/
│   │   │   └── login/
│   │   └── chat/
│   │       ├── chat-layout/
│   │       ├── chat-main/
│   │       ├── chat-sidebar/
│   │       ├── chat-header/
│   │       ├── chat-messages/
│   │       └── chat-input/
│   ├── app.component.ts
│   ├── app.config.ts
│   └── app.routes.ts
├── environments/
│   ├── environment.ts
│   └── environment.development.ts
├── assets/
├── index.html
├── main.ts
└── styles.css
```

## Features

- ✅ SSO Authentication
- ✅ Real-time Chat Interface
- ✅ Chat History & Sessions
- ✅ User Profile Management
- ✅ Responsive Design with Tailwind CSS
- ✅ Enterprise-level Folder Structure

## Tech Stack

- Angular 17 (Standalone Components)
- Tailwind CSS
- TypeScript
- RxJS

## Setup & Installation

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm start
```

3. Build for production:
```bash
npm run build
```

## Development Server

The app will run on `http://localhost:4200/`

## Backend Integration

The frontend is ready to connect to the Node.js/Express backend at:
- Development: `http://localhost:3000/api`
- Production: `/api`

## Environment Variables

Configure in `src/environments/`:
- `apiUrl`: Backend API endpoint
- `ssoUrl`: SSO authentication endpoint

## Next Steps

Now ready for backend development with Node.js and Express!
