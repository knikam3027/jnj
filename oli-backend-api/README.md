# OLI Backend API

Node.js/Express backend for OLI - Operational Learning Intelligence

## 🚀 Quick Start

### Development (Local)
```bash
cd backend
npm install
npm run dev
```

Server runs on: http://localhost:3000

### Production
```bash
cd backend
npm install
NODE_ENV=production npm start
```

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.js          # MySQL connection pool
│   ├── controllers/
│   │   ├── auth.controller.js   # Authentication logic
│   │   └── chat.controller.js   # Chat logic
│   ├── middleware/
│   │   ├── auth.middleware.js   # JWT verification
│   │   └── errorHandler.js      # Global error handler
│   ├── routes/
│   │   ├── auth.routes.js       # Auth endpoints
│   │   └── chat.routes.js       # Chat endpoints
│   └── server.js                # Main server file
├── database/
│   └── schema.sql               # Database schema & sample data
├── .env.development             # Development environment
├── .env.production              # Production environment
├── .gitignore
└── package.json
```

## 🗄️ Database Setup

### 1. Install MySQL
Make sure MySQL is installed and running

### 2. Create Database
```bash
mysql -u root -p < database/schema.sql
```

Or manually:
```sql
CREATE DATABASE oli_db;
USE oli_db;
-- Run contents of database/schema.sql
```

### 3. Configure Environment
Copy and edit `.env.development`:
```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=oli_db
```

## 🔐 Environment Variables

### Development (.env.development)
- `NODE_ENV=development`
- `PORT=3000`
- `FRONTEND_URL=http://localhost:4200`
- `DB_HOST=localhost`
- `JWT_SECRET=your-secret-key`

### Production (.env.production)
- `NODE_ENV=production`
- `FRONTEND_URL=https://oli.jnj.com`
- `DB_HOST=production-db-host`
- Use strong JWT_SECRET

## 📡 API Endpoints

### Authentication

#### POST /api/auth/login
Login with email
```json
Request:
{
  "email": "johnsmith@jis.jnj.com"
}

Response:
{
  "user": {
    "id": 1,
    "email": "johnsmith@jis.jnj.com",
    "name": "John Smith",
    "avatar": null
  },
  "token": "jwt-token-here"
}
```

#### GET /auth/sso?email=user@jnj.com
SSO redirect endpoint (redirects to frontend with token)

### Chat (Requires Authentication)

#### GET /api/chat/history
Get all chat sessions for logged-in user
```json
Response:
[
  {
    "id": 1,
    "title": "Chat title...",
    "createdAt": "2025-12-24T09:30:00.000Z",
    "updatedAt": "2025-12-24T09:30:00.000Z",
    "messages": [...]
  }
]
```

#### POST /api/chat/message
Send a message
```json
Request:
{
  "message": "Your question here",
  "sessionId": 1  // Optional, creates new session if not provided
}

Response:
{
  "message": {
    "id": 5,
    "content": "Bot response",
    "sender": "bot",
    "timestamp": "2025-12-24T10:00:00.000Z"
  },
  "sessionId": 1
}
```

#### GET /api/chat/session/:id
Get specific chat session

#### DELETE /api/chat/session/:id
Delete a chat session

### Health Check

#### GET /health
Check server status
```json
Response:
{
  "status": "OK",
  "environment": "development",
  "timestamp": "2025-12-24T10:00:00.000Z"
}
```

## 🔒 Authentication

All `/api/chat/*` endpoints require JWT token in header:
```
Authorization: Bearer <your-jwt-token>
```

## 🌐 CORS

Configured to allow requests from:
- Development: `http://localhost:4200`
- Production: `https://oli.jnj.com`

## 📦 Dependencies

- **express** - Web framework
- **mysql2** - MySQL client
- **jsonwebtoken** - JWT authentication
- **cors** - CORS middleware
- **helmet** - Security headers
- **dotenv** - Environment variables
- **bcryptjs** - Password hashing (if needed)
- **express-validator** - Input validation

## 🚀 Deployment

### For jnj.com deployment:

1. **Set environment**:
   ```bash
   export NODE_ENV=production
   ```

2. **Configure .env.production**:
   - Update `FRONTEND_URL` to `https://oli.jnj.com`
   - Update database credentials
   - Set strong `JWT_SECRET`

3. **Install dependencies**:
   ```bash
   npm install --production
   ```

4. **Start server**:
   ```bash
   npm start
   ```

5. **Use process manager** (PM2 recommended):
   ```bash
   npm install -g pm2
   pm2 start src/server.js --name oli-backend
   pm2 save
   pm2 startup
   ```

## 🔧 Frontend Integration

Update frontend environment when backend is ready:

**src/environments/environment.development.ts**:
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  ssoUrl: 'http://localhost:3000/auth/sso',
  useMockData: false  // ← Change to false
};
```

**src/environments/environment.ts** (production):
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://oli.jnj.com/api',
  ssoUrl: 'https://oli.jnj.com/auth/sso',
  useMockData: false
};
```

## 📝 Notes

- JWT tokens expire after 24 hours (configurable via JWT_EXPIRES_IN)
- Bot responses are currently mock - integrate with AI service as needed
- Database uses UTF8MB4 for emoji support
- All timestamps in UTC
