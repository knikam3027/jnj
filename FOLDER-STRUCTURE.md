# Oli Platform - Complete Folder Structure (Updated - Enterprise Architecture)

> **Last Updated:** December 25, 2025  
> **Status:** Enterprise-Grade GenAI Architecture ✅

```
oli-platform/
│
├── ARCHITECTURE.md                   ← NEW: Complete architecture docs
├── REFACTORING-SUMMARY.md            ← NEW: Refactoring details
├── MIGRATION-GUIDE.md                ← NEW: Setup guide
├── VERIFICATION-CHECKLIST.md         ← NEW: Verification checklist
├── README.md                         ← NEW: Project overview
├── FOLDER-STRUCTURE.md
├── IMPLEMENTATION-SUMMARY.md
│
├── oli-backend-api/
│   ├── database/
│   │   ├── sql/
│   │   │   ├── schema.sql
│   │   │   └── setup.sql
│   │   │
│   │   └── vector/
│   │       └── README.md
│   │
│   ├── src/
│   │   ├── ai/                       ← ENHANCED: AI Orchestration
│   │   │   ├── llm.service.js        ← NEW: LLM management
│   │   │   ├── rag.service.js        ← NEW: RAG/vector search
│   │   │   ├── embedding.service.js  ← NEW: Embeddings
│   │   │   ├── query-rephrase.service.js ← NEW: Query optimization
│   │   │   ├── guardrails.service.js ← NEW: Safety checks
│   │   │   └── index.js
│   │   │
│   │   ├── config/                   ← ENHANCED: Configuration
│   │   │   ├── database.js           ← UPDATED
│   │   │   ├── env.js                ← NEW: Centralized config
│   │   │   ├── auth.js               ← NEW: Auth config
│   │   │   └── ai.js                 ← NEW: AI config
│   │   │
│   │   ├── controllers/              ← REFACTORED: Thin controllers
│   │   │   ├── auth.controller.js    ← UPDATED: Uses services
│   │   │   ├── chat.controller.js    ← UPDATED: Uses services
│   │   │   └── user.controller.js    ← UPDATED: Uses services
│   │   │
│   │   ├── middleware/
│   │   │   ├── auth.middleware.js
│   │   │   └── errorHandler.js
│   │   │
│   │   ├── repositories/             ← NEW: Repository layer
│   │   │   ├── user.repository.js    ← NEW
│   │   │   ├── session.repository.js ← NEW
│   │   │   ├── message.repository.js ← NEW
│   │   │   ├── token.repository.js   ← NEW
│   │   │   └── index.js              ← UPDATED
│   │   │
│   │   ├── services/                 ← NEW: Service layer
│   │   │   ├── auth.service.js       ← NEW: Auth business logic
│   │   │   ├── chat.service.js       ← NEW: Chat business logic
│   │   │   └── user.service.js       ← NEW: User business logic
│   │   │
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   ├── chat.routes.js
│   │   │   └── user.routes.js
│   │   │
│   │   └── server.js
│   │
│   ├── node_modules/
│   │   └── [package dependencies]
│   │
│   ├── .env                          ← .gitignored
│   ├── .env.example                  ← NEW: Environment template
│   ├── .gitignore
│   ├── API-TESTING.md
│   ├── package.json
│   ├── package-lock.json
│   ├── README.md
│   ├── SETUP-AND-TEST.md
│   └── test-api.js
│
└── oli-frontend-ui/
    ├── src/
    │   ├── app/
    │   │   ├── core/
    │   │   │   ├── data/
    │   │   │   │   └── mock-data.json
    │   │   │   │
    │   │   │   ├── guards/
    │   │   │   │   └── auth.guard.ts
    │   │   │   │
    │   │   │   ├── interceptors/
    │   │   │   │   └── auth.interceptor.ts
    │   │   │   │
    │   │   │   ├── models/
    │   │   │   │   ├── auth.model.ts
    │   │   │   │   └── chat.model.ts
    │   │   │   │
    │   │   │   └── services/
    │   │   │       ├── auth.service.ts
    │   │   │       └── chat.service.ts
    │   │   │
    │   │   ├── features/
    │   │   │   ├── auth/
    │   │   │   │   ├── login/
    │   │   │   │   │   ├── login.component.css
    │   │   │   │   │   ├── login.component.html
    │   │   │   │   │   └── login.component.ts
    │   │   │   │   │
    │   │   │   │   └── sso/
    │   │   │   │       ├── sso.component.css
    │   │   │   │       ├── sso.component.html
    │   │   │   │       └── sso.component.ts
    │   │   │   │
    │   │   │   └── chat/
    │   │   │       ├── chat-header/
    │   │   │       │   ├── chat-header.component.css
    │   │   │       │   ├── chat-header.component.html
    │   │   │       │   └── chat-header.component.ts
    │   │   │       │
    │   │   │       ├── chat-history/
    │   │   │       │   ├── chat-history.component.css
    │   │   │       │   ├── chat-history.component.html
    │   │   │       │   └── chat-history.component.ts
    │   │   │       │
    │   │   │       ├── chat-input/
    │   │   │       │   ├── chat-input.component.css
    │   │   │       │   ├── chat-input.component.html
    │   │   │       │   └── chat-input.component.ts
    │   │   │       │
    │   │   │       ├── chat-layout/
    │   │   │       │   └── chat-layout.component.ts
    │   │   │       │
    │   │   │       ├── chat-main/
    │   │   │       │   ├── chat-main.component.css
    │   │   │       │   ├── chat-main.component.html
    │   │   │       │   └── chat-main.component.ts
    │   │   │       │
    │   │   │       ├── chat-messages/
    │   │   │       │   ├── chat-messages.component.css
    │   │   │       │   ├── chat-messages.component.html
    │   │   │       │   └── chat-messages.component.ts
    │   │   │       │
    │   │   │       ├── chat-session/
    │   │   │       │   ├── chat-session.component.css
    │   │   │       │   ├── chat-session.component.html
    │   │   │       │   └── chat-session.component.ts
    │   │   │       │
    │   │   │       ├── chat-settings/
    │   │   │       │   ├── chat-settings.component.css
    │   │   │       │   ├── chat-settings.component.html
    │   │   │       │   └── chat-settings.component.ts
    │   │   │       │
    │   │   │       └── chat-sidebar/
    │   │   │           ├── chat-sidebar.component.css
    │   │   │           ├── chat-sidebar.component.html
    │   │   │           └── chat-sidebar.component.ts
    │   │   │
    │   │   ├── shared/                    ← NEW: Shared module
    │   │   │   ├── components/            ← NEW: Reusable components
    │   │   │   │   ├── button.component.ts    ← NEW
    │   │   │   │   ├── spinner.component.ts   ← NEW
    │   │   │   │   └── input.component.ts     ← NEW
    │   │   │   │
    │   │   │   ├── pipes/                 ← NEW: Custom pipes
    │   │   │   │   ├── relative-time.pipe.ts  ← NEW
    │   │   │   │   └── markdown.pipe.ts       ← NEW
    │   │   │   │
    │   │   │   ├── utils/                 ← NEW: Utilities
    │   │   │   │   ├── format.utils.ts        ← NEW
    │   │   │   │   ├── validation.utils.ts    ← NEW
    │   │   │   │   └── storage.utils.ts       ← NEW
    │   │   │   │
    │   │   │   └── index.ts               ← NEW: Barrel exports
    │   │   │
    │   │   ├── app.component.ts
    │   │   ├── app.config.ts
    │   │   └── app.routes.ts
    │   │
    │   ├── environments/
    │   │   ├── environment.development.ts
    │   │   └── environment.ts
    │   │
    │   ├── index.html
    │   ├── main.ts
    │   └── styles.css
    │
    ├── .angular/
    │   └── cache/
    │       └── [build cache files]
    │
    ├── .github/
    │   └── copilot-instructions.md
    │
    ├── node_modules/
    │   └── [package dependencies]
    │
    ├── .env
    ├── .gitignore
    ├── angular.json
    ├── DEPLOYMENT.md
    ├── HOW-TO-TEST.md
    ├── package.json
    ├── package-lock.json
    ├── postcss.config.js
    ├── README.md
    ├── tailwind.config.js        ← UPDATED: Enhanced theme
    ├── TESTING.md
    ├── tsconfig.app.json
    └── tsconfig.json
```

---

## 📊 Summary of Changes

### ✅ Backend Enhancements

**New Layers:**
- **Service Layer** (3 files) - Business logic separation
- **AI Orchestration** (5 files) - Enterprise AI architecture
- **Repository Layer** (5 files) - Data access abstraction
- **Enhanced Config** (3 new files) - Centralized configuration

**Refactored:**
- All controllers now thin (only HTTP handling)
- Controllers delegate to services
- Services use repositories for data

**Total Backend Files:** 20+ new/modified files

### ✅ Frontend Enhancements

**New Module:**
- **Shared Module** - Reusable components, pipes, utilities
  - 3 components (Button, Spinner, Input)
  - 2 pipes (RelativeTime, Markdown)
  - 3 utility modules (Format, Validation, Storage)

**Enhanced:**
- Tailwind config with custom theme
- Global styles with component classes

**Total Frontend Files:** 11 new/modified files

### ✅ Documentation

**New Files:**
- ARCHITECTURE.md - Complete architecture guide
- REFACTORING-SUMMARY.md - What changed
- MIGRATION-GUIDE.md - Setup instructions
- VERIFICATION-CHECKLIST.md - Testing checklist
- README.md - Project overview
- .env.example - Environment template

**Total Documentation:** 6 files

---

## Backend Structure (oli-backend-api)

### Main Directories
- **database/** - Database schema and setup scripts
  - **sql/** - SQL schema and setup files
  - **vector/** - Vector database configurations (optional)
  
- **src/** - Application source code
  - **ai/** ← **NEW** - AI/ML integration and orchestration
    - LLM service, RAG, embeddings, guardrails, query optimization
  - **config/** ← **ENHANCED** - Centralized configuration
    - Database, auth, AI, environment settings
  - **controllers/** ← **REFACTORED** - Thin HTTP controllers
    - Delegate to services, no business logic
  - **middleware/** - Authentication and error handling
  - **repositories/** ← **NEW** - Data access layer
    - User, session, message, token repositories
  - **services/** ← **NEW** - Business logic layer
    - Auth, chat, user services
  - **routes/** - API route definitions
    
- **node_modules/** - NPM dependencies

### Key Files
- **server.js** - Express server entry point
- **package.json** - Project dependencies and scripts
- **.env** - Environment variables (not in version control)
- **.env.example** ← **NEW** - Environment template
- **API-TESTING.md** - API testing documentation
- **SETUP-AND-TEST.md** - Setup and testing guide
- **test-api.js** - API test script

## Frontend Structure (oli-frontend-ui)

### Main Directories
- **src/app/** - Angular application code
  - **core/** - Core functionality (guards, interceptors, services, models)
    - **data/** - Mock data for development
    - **guards/** - Route guards (authentication)
    - **interceptors/** - HTTP interceptors (auth token injection)
    - **models/** - TypeScript interfaces and types
    - **services/** - Business logic services (auth, chat)
    
  - **features/** - Feature modules
    - **auth/** - Authentication features
      - login/ - Login component
      - sso/ - Single Sign-On component
    - **chat/** - Chat feature components
      - chat-header, chat-history, chat-input, chat-layout,
      - chat-main, chat-messages, chat-session, chat-settings, chat-sidebar
      
  - **shared/** ← **NEW** - Shared resources
    - **components/** - Reusable UI components (Button, Spinner, Input)
    - **pipes/** - Custom pipes (RelativeTime, Markdown)
    - **utils/** - Utility functions (Format, Validation, Storage)
    
- **src/environments/** - Environment-specific configurations
- **.angular/cache/** - Angular build cache
- **.github/** - GitHub-specific files
- **node_modules/** - NPM dependencies

### Key Files
- **app.component.ts** - Root component
- **app.config.ts** - Application configuration
- **app.routes.ts** - Route definitions
- **main.ts** - Application entry point
- **styles.css** ← **UPDATED** - Global styles with component classes
- **index.html** - HTML template
- **angular.json** - Angular CLI configuration
- **tailwind.config.js** ← **UPDATED** - Enhanced theme
- **tsconfig.json** - TypeScript configuration
- **package.json** - Project dependencies and scripts

---

## Technology Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MySQL with connection pooling
- **Auth**: JWT with refresh tokens + bcrypt
- **AI**: Modular (OpenAI, Azure, Anthropic, etc.)
- **Vector DB**: Pluggable (Pinecone, Weaviate, Qdrant, etc.)
- **Security**: Helmet, CORS, input validation, guardrails

### Frontend
- **Framework**: Angular 17+ (Standalone components)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (utility-first)
- **State**: RxJS with BehaviorSubject
- **HTTP**: Interceptors for auth
- **Routing**: Guards for protection

---

## Architecture Patterns

### Backend (Enterprise)
- **MVC + Services** pattern
- **Repository** pattern for data access
- **Service Layer** for business logic
- **AI Orchestration** for GenAI features
- **Config Management** - Centralized & validated
- **RESTful API** design
- **Middleware** architecture
- **Error Handling** - Centralized

### Frontend (Enterprise)
- **Feature-based** architecture
- **Core/Shared** module pattern
- **Standalone Components** (Angular 17+)
- **Service Layer** for business logic
- **Guard Pattern** for route protection
- **Interceptor Pattern** for HTTP
- **Utility-First CSS** (Tailwind)
- **Barrel Exports** for clean imports

---

## 🎯 Enterprise Features

### Scalability
- ✅ Layered architecture
- ✅ Database connection pooling
- ✅ Stateless design (JWT)
- ✅ Async/await throughout

### Security
- ✅ Multi-layer authentication
- ✅ Input/output guardrails
- ✅ PII detection
- ✅ Content moderation ready
- ✅ SQL injection protection

### Maintainability
- ✅ Clear separation of concerns
- ✅ Consistent patterns
- ✅ Comprehensive documentation
- ✅ Modular design

### AI/GenAI Features
- ✅ LLM orchestration
- ✅ RAG architecture
- ✅ Vector search ready
- ✅ Query optimization
- ✅ Safety guardrails
- ✅ Pluggable AI providers

---

**Status:** ✅ Enterprise-Grade Architecture Complete  
**Breaking Changes:** ❌ None - All existing APIs preserved  
**Documentation:** ✅ Comprehensive
