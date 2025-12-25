/**
 * Environment Configuration
 * Centralizes all environment variable access
 * 
 * Enterprise Pattern: Configuration Management
 * - Single source of truth for environment variables
 * - Type checking and validation
 * - Default values
 * - Easy to test with different configs
 */

require('dotenv').config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

const config = {
  // Server Configuration
  server: {
    port: parseInt(process.env.PORT || '3000', 10),
    env: process.env.NODE_ENV || 'development',
    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:4200'
  },

  // Database Configuration
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    name: process.env.DB_NAME || 'oli_database',
    connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT || '10', 10)
  },

  // Authentication Configuration
  auth: {
    jwtSecret: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '15m',
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-change-in-production',
    jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
    bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS || '10', 10)
  },

  // AI Configuration
  ai: {
    provider: process.env.AI_PROVIDER || 'openai', // openai, azure, anthropic, etc.
    apiKey: process.env.OPENAI_API_KEY || '',
    apiUrl: process.env.OPENAI_API_URL || 'https://api.openai.com/v1',
    model: process.env.AI_MODEL || 'gpt-4',
    temperature: parseFloat(process.env.AI_TEMPERATURE || '0.7'),
    maxTokens: parseInt(process.env.AI_MAX_TOKENS || '1000', 10),
    embeddingModel: process.env.AI_EMBEDDING_MODEL || 'text-embedding-ada-002'
  },

  // Vector Database Configuration
  vectorDb: {
    provider: process.env.VECTOR_DB_PROVIDER || 'pinecone', // pinecone, weaviate, qdrant, etc.
    apiKey: process.env.VECTOR_DB_API_KEY || '',
    indexName: process.env.VECTOR_DB_INDEX || 'oli-index',
    dimension: parseInt(process.env.VECTOR_DB_DIMENSION || '1536', 10)
  },

  // RAG Configuration
  rag: {
    enabled: process.env.RAG_ENABLED === 'true',
    chunkSize: parseInt(process.env.RAG_CHUNK_SIZE || '1000', 10),
    chunkOverlap: parseInt(process.env.RAG_CHUNK_OVERLAP || '200', 10),
    topK: parseInt(process.env.RAG_TOP_K || '5', 10),
    similarityThreshold: parseFloat(process.env.RAG_SIMILARITY_THRESHOLD || '0.7')
  },

  // Guardrails Configuration
  guardrails: {
    enabled: process.env.GUARDRAILS_ENABLED !== 'false', // Enabled by default
    maxInputLength: parseInt(process.env.MAX_INPUT_LENGTH || '10000', 10),
    moderationApiKey: process.env.MODERATION_API_KEY || ''
  },

  // Logging Configuration
  logging: {
    level: process.env.LOG_LEVEL || 'info', // error, warn, info, debug
    format: process.env.LOG_FORMAT || 'json' // json, simple
  },

  // CORS Configuration
  cors: {
    allowedOrigins: (process.env.CORS_ORIGINS || process.env.FRONTEND_URL || 'http://localhost:4200')
      .split(',')
      .map(origin => origin.trim())
  },

  // Rate Limiting Configuration
  rateLimit: {
    enabled: process.env.RATE_LIMIT_ENABLED !== 'false',
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000', 10), // 1 minute
    maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10)
  }
};

/**
 * Validate required configuration
 */
const validateConfig = () => {
  const errors = [];

  // Check critical configurations in production
  if (config.server.env === 'production') {
    if (config.auth.jwtSecret === 'your-secret-key-change-in-production') {
      errors.push('JWT_SECRET must be set in production');
    }
    if (config.auth.jwtRefreshSecret === 'your-refresh-secret-change-in-production') {
      errors.push('JWT_REFRESH_SECRET must be set in production');
    }
    if (!config.database.password) {
      errors.push('DB_PASSWORD must be set in production');
    }
  }

  if (errors.length > 0) {
    console.error('Configuration Errors:');
    errors.forEach(error => console.error(`  - ${error}`));
    throw new Error('Invalid configuration');
  }
};

// Validate on load
validateConfig();

module.exports = config;
