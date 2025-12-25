# 🚀 OLI Platform - Enterprise GenAI Application

An enterprise-grade full-stack GenAI chat platform built with Node.js, Express, Angular, and Tailwind CSS.

## ✨ Features

### Core Features
- 🔐 **Authentication** - JWT-based auth with refresh tokens
- 💬 **AI Chat** - Intelligent conversational AI
- 📊 **Chat History** - Persistent chat sessions
- 👤 **User Profiles** - User management and settings
- 🎨 **Modern UI** - Tailwind CSS with custom theme

### Enterprise Features
- 🤖 **AI Orchestration** - Modular AI service architecture
- 🛡️ **Guardrails** - Input/output safety checks
- 🔍 **RAG Support** - Retrieval-Augmented Generation (optional)
- 📝 **Query Optimization** - Intelligent query rephrasing
- 🎯 **Vector Search** - Semantic search capabilities
- 🔒 **Security** - Multiple layers of protection
- 📈 **Scalable** - Production-ready architecture

## 🏗️ Architecture

### Backend (Node.js + Express)
```
Routes → Middleware → Controllers → Services → Repositories → Database
                                         ↓
                                   AI Services
```

**Layers:**
- **Routes** - API endpoint definitions
- **Middleware** - Auth, validation, error handling
- **Controllers** - HTTP request/response (thin layer)
- **Services** - Business logic
- **Repositories** - Data access layer
- **AI Services** - LLM, RAG, embeddings, guardrails

### Frontend (Angular + Tailwind)
```
app/
├── core/          # Guards, interceptors, services
├── features/      # Feature modules (auth, chat)
└── shared/        # Reusable components, pipes, utils
```

**Patterns:**
- Standalone components
- Feature-based architecture
- Shared module for reusability
- Tailwind utility-first CSS

## 📋 Prerequisites

- **Node.js** 16+ ([Download](https://nodejs.org/))
- **MySQL** 8+ ([Download](https://dev.mysql.com/downloads/mysql/))
- **npm** or **yarn**

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd oli-platform
```

### 2. Backend Setup

```bash
cd oli-backend-api

# Install dependencies
npm install

# Copy environment template
cp .env.example .env.development

# Edit .env.development with your settings
# At minimum, configure:
# - Database credentials (DB_USER, DB_PASSWORD, DB_NAME)
# - JWT secrets (JWT_SECRET, JWT_REFRESH_SECRET)

# Setup database
mysql -u root -p oli_database < database/sql/setup.sql
mysql -u root -p oli_database < database/sql/schema.sql

# Start server
npm start
```

Backend runs on: `http://localhost:3000`

### 3. Frontend Setup

```bash
cd oli-frontend-ui

# Install dependencies
npm install

# Start development server
npm start
```

Frontend runs on: `http://localhost:4200`

### 4. Verify Installation

**Backend:**
```bash
curl http://localhost:3000/health
```

**Frontend:**
Open browser: `http://localhost:4200`

## 📖 Documentation

- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Complete architecture overview
- **[REFACTORING-SUMMARY.md](./REFACTORING-SUMMARY.md)** - Refactoring details
- **[MIGRATION-GUIDE.md](./MIGRATION-GUIDE.md)** - Setup and migration guide

## 🗂️ Project Structure

```
oli-platform/
│
├── oli-backend-api/              # Backend (Node.js + Express)
│   ├── src/
│   │   ├── ai/                   # AI orchestration services
│   │   │   ├── llm.service.js
│   │   │   ├── rag.service.js
│   │   │   ├── embedding.service.js
│   │   │   ├── query-rephrase.service.js
│   │   │   └── guardrails.service.js
│   │   │
│   │   ├── config/               # Configuration
│   │   │   ├── env.js
│   │   │   ├── database.js
│   │   │   ├── auth.js
│   │   │   └── ai.js
│   │   │
│   │   ├── controllers/          # HTTP controllers
│   │   │   ├── auth.controller.js
│   │   │   ├── chat.controller.js
│   │   │   └── user.controller.js
│   │   │
│   │   ├── middleware/           # Express middleware
│   │   │   ├── auth.middleware.js
│   │   │   └── errorHandler.js
│   │   │
│   │   ├── repositories/         # Data access layer
│   │   │   ├── user.repository.js
│   │   │   ├── session.repository.js
│   │   │   ├── message.repository.js
│   │   │   └── token.repository.js
│   │   │
│   │   ├── routes/               # API routes
│   │   │   ├── auth.routes.js
│   │   │   ├── chat.routes.js
│   │   │   └── user.routes.js
│   │   │
│   │   ├── services/             # Business logic
│   │   │   ├── auth.service.js
│   │   │   ├── chat.service.js
│   │   │   └── user.service.js
│   │   │
│   │   └── server.js             # Entry point
│   │
│   ├── database/                 # Database files
│   │   └── sql/
│   │       ├── setup.sql
│   │       └── schema.sql
│   │
│   ├── .env.example              # Environment template
│   ├── package.json
│   └── README.md
│
└── oli-frontend-ui/              # Frontend (Angular)
    ├── src/
    │   ├── app/
    │   │   ├── core/             # Core services & guards
    │   │   │   ├── guards/
    │   │   │   ├── interceptors/
    │   │   │   ├── models/
    │   │   │   └── services/
    │   │   │
    │   │   ├── features/         # Feature modules
    │   │   │   ├── auth/
    │   │   │   │   ├── login/
    │   │   │   │   └── sso/
    │   │   │   └── chat/
    │   │   │       ├── chat-header/
    │   │   │       ├── chat-history/
    │   │   │       ├── chat-input/
    │   │   │       ├── chat-main/
    │   │   │       ├── chat-messages/
    │   │   │       ├── chat-session/
    │   │   │       ├── chat-settings/
    │   │   │       └── chat-sidebar/
    │   │   │
    │   │   └── shared/           # Shared resources
    │   │       ├── components/
    │   │       ├── pipes/
    │   │       └── utils/
    │   │
    │   ├── environments/
    │   ├── styles.css
    │   └── main.ts
    │
    ├── tailwind.config.js
    ├── angular.json
    └── package.json
```

## 🔧 Configuration

### Environment Variables

See [`.env.example`](./oli-backend-api/.env.example) for all available options.

**Required:**
- `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`
- `JWT_SECRET`, `JWT_REFRESH_SECRET`

**Optional (for AI features):**
- `OPENAI_API_KEY` - For AI chat
- `VECTOR_DB_API_KEY` - For RAG
- `RAG_ENABLED` - Enable/disable RAG

### Database

Tables:
- `users` - User accounts
- `chat_sessions` - Chat conversation sessions
- `messages` - Chat messages
- `refresh_tokens` - JWT refresh tokens

## 🧪 Testing

### Backend API Tests

```bash
# Health check
curl http://localhost:3000/health

# Register user
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test123!",
    "firstName": "Test",
    "lastName": "User"
  }'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test123!"
  }'
```

### Frontend

```bash
cd oli-frontend-ui
npm test
```

## 🚢 Deployment

### Backend

```bash
# Build
npm install --production

# Run
NODE_ENV=production node src/server.js
```

### Frontend

```bash
# Build for production
ng build --configuration production

# Deploy dist/ folder to hosting service
```

## 🔐 Security Features

- **JWT Authentication** with refresh tokens
- **Password Hashing** with bcrypt
- **Input Validation** on all endpoints
- **AI Guardrails** - Content filtering, PII detection
- **CORS Protection**
- **Security Headers** (Helmet)
- **SQL Injection Protection** (parameterized queries)

## 🤖 AI Features

### Current Implementation
- ✅ LLM integration ready (OpenAI compatible)
- ✅ Conversation history management
- ✅ Input/output guardrails
- ✅ Query optimization
- ✅ RAG architecture (vector search ready)

### Optional Integrations
- 🔌 OpenAI GPT-4
- 🔌 Azure OpenAI
- 🔌 Anthropic Claude
- 🔌 Pinecone (vector DB)
- 🔌 Weaviate (vector DB)

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/sso` - SSO login

### Chat
- `GET /api/chat/history` - Get user's chat history
- `POST /api/chat/message` - Send message and get AI response
- `GET /api/chat/session/:id` - Get specific chat session
- `DELETE /api/chat/session/:id` - Delete chat session

### User
- `GET /api/users/me` - Get current user profile
- `PATCH /api/users/me` - Update user profile

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MySQL
- **Auth**: JWT + bcrypt
- **AI**: OpenAI (configurable)

### Frontend
- **Framework**: Angular 17+
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **HTTP**: RxJS
- **State**: Services with BehaviorSubject

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Follow the existing architecture patterns
4. Write tests
5. Submit a pull request

## 📝 License

[Your License Here]

## 👥 Authors

[Your Team/Name Here]

## 🙏 Acknowledgments

Built with enterprise best practices for:
- Clean architecture
- Separation of concerns
- Scalability
- Maintainability
- Security

---

**Need Help?** Check the [MIGRATION-GUIDE.md](./MIGRATION-GUIDE.md) for detailed setup instructions.

**Questions?** Open an issue or check the [ARCHITECTURE.md](./ARCHITECTURE.md) documentation.

---

Built with ❤️ for enterprise GenAI applications
