# Enterprise Architecture Documentation

## Overview

This document describes the enterprise-grade GenAI architecture implemented for the OLI Platform. The architecture follows industry best practices for scalability, maintainability, and separation of concerns.

---

## Backend Architecture (Node.js + Express)

### Architectural Pattern: MVC + Service Layer

```
┌─────────────────────────────────────────────────────────────┐
│                         Client Request                       │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                    Routes (API Endpoints)                    │
│  • auth.routes.js                                            │
│  • chat.routes.js                                            │
│  • user.routes.js                                            │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                  Middleware (Authentication)                 │
│  • auth.middleware.js                                        │
│  • errorHandler.js                                           │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│              Controllers (Request/Response)                  │
│  • auth.controller.js                                        │
│  • chat.controller.js                                        │
│  • user.controller.js                                        │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                Services (Business Logic)                     │
│  • auth.service.js                                           │
│  • chat.service.js                                           │
│  • user.service.js                                           │
└──────────┬─────────────────────────┬────────────────────────┘
           │                         │
           ▼                         ▼
┌──────────────────────┐  ┌──────────────────────────────────┐
│   Repositories       │  │    AI Orchestration              │
│  • user.repository   │  │  • llm.service.js                │
│  • session.repository│  │  • rag.service.js                │
│  • message.repository│  │  • embedding.service.js          │
│  • token.repository  │  │  • query-rephrase.service.js     │
└──────────┬───────────┘  │  • guardrails.service.js         │
           │              └────────────┬─────────────────────┘
           ▼                           │
┌──────────────────────┐              │
│     MySQL Database   │              ▼
│  • users             │  ┌──────────────────────────────────┐
│  • chat_sessions     │  │   External AI Services           │
│  • messages          │  │  • OpenAI API                    │
│  • refresh_tokens    │  │  • Vector Database (Pinecone)    │
└──────────────────────┘  │  • Moderation API                │
                          └──────────────────────────────────┘
```

### Layer Responsibilities

#### 1. Routes
- Define API endpoints
- Map endpoints to controllers
- Apply middleware (auth, validation)

#### 2. Middleware
- Authentication & Authorization
- Error handling
- Request validation
- Logging

#### 3. Controllers (Thin Layer)
- Handle HTTP requests/responses
- Validate input
- Call services
- Format responses
- **NO business logic**

#### 4. Services (Business Logic)
- Core application logic
- Orchestrate repositories
- Orchestrate AI services
- Transaction management
- **Single responsibility principle**

#### 5. Repositories (Data Access)
- Database queries
- Data persistence
- CRUD operations
- **Abstract database details**

#### 6. AI Orchestration
- **LLM Service**: Manages LLM API calls
- **RAG Service**: Retrieval-Augmented Generation
- **Embedding Service**: Text-to-vector conversions
- **Query Rephrase**: Optimize queries for retrieval
- **Guardrails**: Safety and compliance checks

---

## AI Orchestration Pipeline

### Chat Message Flow

```
User Message
    │
    ▼
[Guardrails - Input Check]
    │ ✓ No toxic content
    │ ✓ No PII
    │ ✓ No prompt injection
    ▼
[Query Rephrase Service]
    │ → Optimize for retrieval
    │ → Resolve pronouns
    │ → Add context
    ▼
[RAG Service]
    │ → Generate embedding
    │ → Vector search
    │ → Retrieve context
    ▼
[LLM Service]
    │ → Build prompt with context
    │ → Call LLM API
    │ → Generate response
    ▼
[Guardrails - Output Check]
    │ ✓ No toxic content
    │ ✓ No PII leakage
    │ ✓ Quality check
    ▼
Bot Response
```

---

## Configuration Management

### Config Structure

```
src/config/
├── env.js          # Central environment config
├── database.js     # Database connection pool
├── auth.js         # JWT & authentication settings
└── ai.js           # AI/LLM configuration
```

### Environment Variables

All configuration is managed through environment variables:

- **Server**: `PORT`, `NODE_ENV`, `FRONTEND_URL`
- **Database**: `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`
- **Auth**: `JWT_SECRET`, `JWT_REFRESH_SECRET`, `JWT_EXPIRES_IN`
- **AI**: `OPENAI_API_KEY`, `AI_MODEL`, `AI_TEMPERATURE`
- **Vector DB**: `VECTOR_DB_PROVIDER`, `VECTOR_DB_API_KEY`
- **RAG**: `RAG_ENABLED`, `RAG_CHUNK_SIZE`, `RAG_TOP_K`

---

## Frontend Architecture (Angular)

### Structure

```
src/app/
├── core/                    # Core functionality (singleton services)
│   ├── guards/              # Route guards
│   ├── interceptors/        # HTTP interceptors
│   ├── models/              # TypeScript interfaces
│   └── services/            # Business services
│
├── features/                # Feature modules
│   ├── auth/
│   │   ├── login/
│   │   └── sso/
│   └── chat/
│       ├── chat-header/
│       ├── chat-history/
│       ├── chat-input/
│       ├── chat-main/
│       ├── chat-messages/
│       ├── chat-session/
│       ├── chat-settings/
│       └── chat-sidebar/
│
└── shared/                  # Shared UI components & utilities
    ├── components/          # Reusable UI components
    │   ├── button.component.ts
    │   ├── spinner.component.ts
    │   └── input.component.ts
    ├── pipes/               # Custom pipes
    │   ├── relative-time.pipe.ts
    │   └── markdown.pipe.ts
    └── utils/               # Utility functions
        ├── format.utils.ts
        ├── validation.utils.ts
        └── storage.utils.ts
```

### Design Patterns

#### 1. Core Module Pattern
- Singleton services
- Auth guards and interceptors
- Shared data models

#### 2. Feature Module Pattern
- Self-contained features
- Lazy loading support
- Clear boundaries

#### 3. Shared Module Pattern
- Reusable components
- Common utilities
- Custom pipes

---

## Tailwind CSS Architecture

### Custom Theme

Extended Tailwind with:
- Custom color palette (primary, secondary, success, warning, error)
- Custom spacing and typography
- Custom shadows and transitions

### Component Classes

```css
@layer components {
  .card { ... }
  .btn-primary { ... }
  .form-input { ... }
  .chat-bubble-user { ... }
}
```

### Utility-First Approach

- Prefer Tailwind utilities over custom CSS
- Use `@apply` directive for component classes
- Keep global styles minimal

---

## Best Practices

### Backend

1. **Controllers are thin** - Only handle HTTP
2. **Services contain logic** - Reusable and testable
3. **Repositories abstract data** - Single source of truth
4. **Config is centralized** - Environment-based
5. **AI is orchestrated** - Modular and pluggable

### Frontend

1. **Components are standalone** - Angular standalone API
2. **Services are injectable** - Dependency injection
3. **Shared module** - DRY principle
4. **Tailwind utilities** - Consistent styling
5. **Type safety** - TypeScript interfaces

---

## Security Considerations

### Authentication
- JWT with refresh tokens
- Password hashing (bcrypt)
- Token rotation
- Secure cookies

### AI Safety
- Input guardrails (toxicity, PII, injection)
- Output validation
- Content moderation
- Rate limiting

### Data Protection
- SQL injection prevention (parameterized queries)
- XSS prevention (sanitization)
- CORS configuration
- Helmet security headers

---

## Scalability

### Horizontal Scaling
- Stateless architecture
- JWT-based auth (no server sessions)
- Connection pooling

### Vertical Scaling
- Efficient queries
- Caching strategies
- Async operations

### AI Scaling
- Batch embeddings
- Vector DB indexing
- LLM streaming (future)
- Request queuing

---

## Testing Strategy

### Backend
- Unit tests for services
- Integration tests for repositories
- API tests for endpoints

### Frontend
- Component unit tests
- Service tests with mocks
- E2E tests for critical flows

---

## Future Enhancements

### Backend
1. Redis for caching and sessions
2. Message queue (RabbitMQ/Bull) for async tasks
3. Microservices decomposition
4. GraphQL API option
5. WebSocket for real-time chat

### AI
1. Streaming responses (SSE/WebSocket)
2. Multi-model support
3. Fine-tuned models
4. Advanced RAG (reranking, hybrid search)
5. Agent frameworks (LangChain, AutoGPT)

### Frontend
1. Progressive Web App (PWA)
2. Offline support
3. Advanced state management (NgRx)
4. Component library (Storybook)
5. Design system

---

## Maintenance

### Code Quality
- ESLint for linting
- Prettier for formatting
- TypeScript strict mode
- Code reviews

### Documentation
- JSDoc for functions
- Architecture decision records (ADRs)
- API documentation (Swagger/OpenAPI)
- README files

### Monitoring
- Error tracking (Sentry)
- Performance monitoring (New Relic)
- Logging (Winston/Pino)
- Metrics (Prometheus)

---

## Conclusion

This architecture provides a solid foundation for an enterprise-grade GenAI application with:

✅ **Separation of Concerns** - Clear layer boundaries  
✅ **Scalability** - Horizontal and vertical scaling  
✅ **Maintainability** - Clean code and patterns  
✅ **Security** - Multiple layers of protection  
✅ **Testability** - Mockable dependencies  
✅ **Flexibility** - Pluggable AI providers  

The architecture is production-ready and follows industry best practices.
