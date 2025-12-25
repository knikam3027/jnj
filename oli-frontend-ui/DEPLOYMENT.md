# OLI - Operational Learning Intelligence

Complete Angular + Node.js + MySQL application for enterprise chat assistant.

## 📁 Project Structure

```
project/
├── backend/                    # Node.js/Express API
│   ├── src/
│   │   ├── config/            # Database config
│   │   ├── controllers/       # Business logic
│   │   ├── middleware/        # Auth & error handling
│   │   ├── routes/            # API routes
│   │   └── server.js          # Main server
│   ├── database/
│   │   └── schema.sql         # MySQL schema
│   ├── .env.development       # Dev environment
│   ├── .env.production        # Prod environment
│   └── package.json
│
├── src/                       # Angular Frontend
│   ├── app/
│   │   ├── core/             # Services, guards, interceptors
│   │   ├── features/         # Feature modules (auth, chat)
│   │   └── shared/           # Shared components
│   └── environments/         # Environment configs
│
├── .github/                   
│   └── copilot-instructions.md
└── README.md (this file)
```

## 🚀 Quick Start

### 1. Setup Database (MySQL)
```bash
mysql -u root -p
CREATE DATABASE oli_db;
USE oli_db;
source backend/database/schema.sql;
```

### 2. Configure Backend
```bash
cd backend
cp .env.development .env
# Edit .env with your MySQL credentials
```

### 3. Start Backend
```bash
cd backend
npm install
npm run dev
```
Backend runs on: http://localhost:3000

### 4. Configure Frontend
Edit `src/environments/environment.development.ts`:
```typescript
useMockData: false  // Change to false to use real backend
```

### 5. Start Frontend
```bash
npm install
npm start
```
Frontend runs on: http://localhost:4200

## 🌐 Environment Configuration

### Local Development
**Backend (.env.development)**:
- API: http://localhost:3000
- Database: localhost MySQL

**Frontend (environment.development.ts)**:
- API URL: http://localhost:3000/api
- Mock Data: false (use real backend)

### Production (jnj.com)
**Backend (.env.production)**:
- API: https://oli.jnj.com
- Database: Production MySQL server
- Strong JWT secret

**Frontend (environment.ts)**:
- API URL: https://oli.jnj.com/api
- SSO URL: https://oli.jnj.com/auth/sso

## 📡 API Endpoints

### Authentication
- `POST /api/auth/login` - Email login
- `GET /auth/sso` - SSO redirect

### Chat (Authenticated)
- `GET /api/chat/history` - Get all chats
- `POST /api/chat/message` - Send message
- `GET /api/chat/session/:id` - Get specific chat
- `DELETE /api/chat/session/:id` - Delete chat

### Health
- `GET /health` - Server status

## 🔐 Authentication Flow

1. User enters email
2. Backend creates/finds user
3. Returns JWT token
4. Frontend stores token
5. All chat requests include token in `Authorization: Bearer <token>` header

## 🚀 Deployment

### Frontend (Angular)
```bash
npm run build
# Deploy dist/oli-frontend to web server
# Configure to serve on oli.jnj.com
```

### Backend (Node.js)
```bash
cd backend
npm install --production
NODE_ENV=production npm start
# Or use PM2:
pm2 start src/server.js --name oli-backend
```

### Database (MySQL)
- Run schema.sql on production database
- Update .env.production with credentials

## 🔧 Development vs Production

| Feature | Development | Production |
|---------|-------------|------------|
| Frontend URL | localhost:4200 | oli.jnj.com |
| Backend URL | localhost:3000 | oli.jnj.com/api |
| Database | Local MySQL | Production MySQL |
| Mock Data | Optional | Disabled |
| CORS | localhost:4200 | oli.jnj.com |
| SSL | Not required | Required (HTTPS) |

## 📦 Technologies

### Frontend
- Angular 17
- Tailwind CSS
- RxJS
- TypeScript

### Backend
- Node.js
- Express
- MySQL
- JWT Authentication
- Helmet (Security)
- CORS

## 🎯 Features

- ✅ SSO Authentication
- ✅ Real-time Chat
- ✅ Chat History
- ✅ Session Management
- ✅ User Profiles
- ✅ Responsive Design
- ✅ Enterprise Architecture
- ✅ Environment-based Config
- ✅ Production Ready

## 📝 Next Steps

1. **Setup MySQL** database
2. **Configure** .env files
3. **Test locally** with real backend
4. **Deploy** to production servers
5. **Configure DNS** for oli.jnj.com
6. **Setup SSL** certificates
7. **Monitor** and maintain

## 🔒 Security

- JWT tokens expire after 24h
- Passwords hashed with bcrypt (if implemented)
- Helmet.js security headers
- CORS configured for specific origins
- SQL injection prevention (parameterized queries)
- Input validation with express-validator

## 📞 Support

For issues or questions, refer to:
- Frontend: README.md in root
- Backend: backend/README.md
- Testing: TESTING.md, HOW-TO-TEST.md
