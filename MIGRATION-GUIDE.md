# Migration Guide

## Quick Start

This guide helps you get started with the refactored enterprise architecture.

---

## Prerequisites

- Node.js 16+ installed
- MySQL database running
- npm or yarn package manager

---

## Backend Setup

### 1. Install Dependencies

```bash
cd oli-backend-api
npm install
```

### 2. Environment Configuration

Create a `.env.development` file in `oli-backend-api/`:

```env
# Server
NODE_ENV=development
PORT=3000
FRONTEND_URL=http://localhost:4200

# Database
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=oli_database
DB_CONNECTION_LIMIT=10

# Authentication
JWT_SECRET=your-secret-key-change-me
JWT_EXPIRES_IN=15m
JWT_REFRESH_SECRET=your-refresh-secret-change-me
JWT_REFRESH_EXPIRES_IN=7d
BCRYPT_ROUNDS=10

# AI Configuration (Optional - for full AI features)
AI_PROVIDER=openai
OPENAI_API_KEY=your-openai-api-key
AI_MODEL=gpt-4
AI_TEMPERATURE=0.7
AI_MAX_TOKENS=1000
AI_EMBEDDING_MODEL=text-embedding-ada-002

# Vector Database (Optional - for RAG)
VECTOR_DB_PROVIDER=pinecone
VECTOR_DB_API_KEY=your-pinecone-api-key
VECTOR_DB_INDEX=oli-index
VECTOR_DB_DIMENSION=1536

# RAG Configuration
RAG_ENABLED=false
RAG_CHUNK_SIZE=1000
RAG_CHUNK_OVERLAP=200
RAG_TOP_K=5
RAG_SIMILARITY_THRESHOLD=0.7

# Guardrails
GUARDRAILS_ENABLED=true
MAX_INPUT_LENGTH=10000
MODERATION_API_KEY=

# Logging
LOG_LEVEL=info
LOG_FORMAT=json

# CORS
CORS_ORIGINS=http://localhost:4200

# Rate Limiting
RATE_LIMIT_ENABLED=false
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=100
```

### 3. Database Setup

Run the existing database schema:

```bash
# Using the existing SQL files
mysql -u root -p oli_database < database/sql/setup.sql
mysql -u root -p oli_database < database/sql/schema.sql
```

### 4. Start Backend Server

```bash
npm start
# or
npm run dev  # if you have nodemon
```

Server should start on `http://localhost:3000`

---

## Frontend Setup

### 1. Install Dependencies

```bash
cd oli-frontend-ui
npm install
```

### 2. Environment Configuration

The frontend environment files are already configured. No changes needed unless you modify the backend URL.

### 3. Start Frontend

```bash
npm start
# or
ng serve
```

Frontend should start on `http://localhost:4200`

---

## Verify Installation

### Backend Health Check

```bash
curl http://localhost:3000/health
```

Expected response:
```json
{
  "status": "OK",
  "environment": "development",
  "timestamp": "2025-12-25T..."
}
```

### Frontend

Open browser: `http://localhost:4200`

You should see the login page.

---

## What Changed?

### Backend Changes

#### File Structure (New Files)
```
src/
├── services/              ← NEW: Business logic layer
│   ├── auth.service.js
│   ├── chat.service.js
│   └── user.service.js
│
├── ai/                    ← NEW: AI orchestration
│   ├── llm.service.js
│   ├── rag.service.js
│   ├── embedding.service.js
│   ├── query-rephrase.service.js
│   └── guardrails.service.js
│
├── repositories/          ← ENHANCED: Data access layer
│   ├── user.repository.js
│   ├── session.repository.js
│   ├── message.repository.js
│   └── token.repository.js
│
└── config/                ← EXPANDED: Configuration
    ├── env.js             ← NEW
    ├── auth.js            ← NEW
    └── ai.js              ← NEW
```

#### Controllers (Modified)
All controllers are now "thin" - they only handle HTTP:
- `auth.controller.js` - Uses `auth.service`
- `chat.controller.js` - Uses `chat.service`
- `user.controller.js` - Uses `user.service`

### Frontend Changes

#### New Shared Module
```
src/app/shared/
├── components/            ← NEW: Reusable UI components
│   ├── button.component.ts
│   ├── spinner.component.ts
│   └── input.component.ts
├── pipes/                 ← NEW: Custom pipes
│   ├── relative-time.pipe.ts
│   └── markdown.pipe.ts
└── utils/                 ← NEW: Utility functions
    ├── format.utils.ts
    ├── validation.utils.ts
    └── storage.utils.ts
```

#### Enhanced Styling
- Updated `tailwind.config.js` with custom theme
- Enhanced `styles.css` with component classes

---

## Using the New Architecture

### Backend: Creating a New Feature

#### 1. Create Repository (if needed)

```javascript
// src/repositories/example.repository.js
const db = require('../config/database');

const findAll = async () => {
  const [rows] = await db.query('SELECT * FROM examples');
  return rows;
};

module.exports = { findAll };
```

#### 2. Create Service

```javascript
// src/services/example.service.js
const exampleRepository = require('../repositories/example.repository');

const getAllExamples = async () => {
  return await exampleRepository.findAll();
};

module.exports = { getAllExamples };
```

#### 3. Create Controller

```javascript
// src/controllers/example.controller.js
const exampleService = require('../services/example.service');

exports.getAll = async (req, res) => {
  try {
    const examples = await exampleService.getAllExamples();
    res.status(200).json(examples);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get examples' });
  }
};
```

#### 4. Create Route

```javascript
// src/routes/example.routes.js
const router = require('express').Router();
const exampleController = require('../controllers/example.controller');
const { authenticate } = require('../middleware/auth.middleware');

router.get('/', authenticate, exampleController.getAll);

module.exports = router;
```

### Frontend: Using Shared Components

```typescript
import { Component } from '@angular/core';
import { ButtonComponent, SpinnerComponent } from '@app/shared';

@Component({
  selector: 'app-my-feature',
  standalone: true,
  imports: [ButtonComponent, SpinnerComponent],
  template: `
    <app-button 
      variant="primary" 
      (clicked)="handleClick()">
      Click Me
    </app-button>
    
    <app-spinner 
      *ngIf="loading" 
      message="Loading...">
    </app-spinner>
  `
})
export class MyFeatureComponent {
  loading = false;
  
  handleClick() {
    console.log('Button clicked!');
  }
}
```

---

## AI Features

### Enable AI Features

1. **Get OpenAI API Key**: https://platform.openai.com/api-keys

2. **Update .env**:
```env
OPENAI_API_KEY=sk-...your-key...
RAG_ENABLED=false  # Set to true if using vector DB
```

3. **Test AI Chat**:
```bash
# Send a message
curl -X POST http://localhost:3000/api/chat/message \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello, how are you?"}'
```

### Optional: Enable RAG

1. **Setup Vector Database** (e.g., Pinecone)
2. **Update .env**:
```env
RAG_ENABLED=true
VECTOR_DB_API_KEY=your-pinecone-key
```

3. **Index Documents**:
```javascript
const ragService = require('./src/ai/rag.service');

await ragService.indexDocument(
  'Your document content here',
  { source: 'manual', createdAt: new Date() }
);
```

---

## Troubleshooting

### Backend Issues

**Database Connection Failed**
```
Error: ER_ACCESS_DENIED_ERROR
```
→ Check `DB_USER`, `DB_PASSWORD`, `DB_HOST` in `.env`

**JWT Secret Warning**
```
Configuration Error: JWT_SECRET must be set in production
```
→ Change `JWT_SECRET` and `JWT_REFRESH_SECRET` in `.env`

**Port Already in Use**
```
Error: listen EADDRINUSE: address already in use :::3000
```
→ Change `PORT` in `.env` or kill process on port 3000

### Frontend Issues

**Module not found**
```
Cannot find module '@angular/core'
```
→ Run `npm install` in frontend directory

**Tailwind styles not working**
→ Make sure `tailwind.config.js` and `styles.css` are properly configured

---

## Testing

### Backend

```bash
# Test with curl
curl http://localhost:3000/health

# Test auth
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test123!",
    "firstName": "Test",
    "lastName": "User"
  }'
```

### Frontend

1. Open `http://localhost:4200`
2. Register a new account
3. Login
4. Test chat functionality

---

## Production Deployment

### Backend

1. **Update .env.production**:
```env
NODE_ENV=production
PORT=3000
FRONTEND_URL=https://your-domain.com

# Use strong secrets
JWT_SECRET=generate-a-strong-random-secret
JWT_REFRESH_SECRET=generate-another-strong-random-secret

# Production database
DB_HOST=your-production-db-host
DB_PASSWORD=strong-db-password
```

2. **Build and Run**:
```bash
npm install --production
NODE_ENV=production node src/server.js
```

### Frontend

1. **Build for Production**:
```bash
ng build --configuration production
```

2. **Deploy dist/ folder** to your hosting service

---

## Need Help?

- Check [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed architecture
- Check [REFACTORING-SUMMARY.md](./REFACTORING-SUMMARY.md) for what changed
- Review code comments in service files
- All existing APIs remain unchanged

---

**Status: ✅ Ready to Use**

Your enterprise-grade GenAI platform is ready!
