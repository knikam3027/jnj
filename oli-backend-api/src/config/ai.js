/**
 * AI Configuration
 * Settings for LLM, embeddings, RAG, and guardrails
 */

const config = require('./env');

module.exports = {
  // LLM Provider Configuration
  llm: {
    provider: config.ai.provider,
    apiKey: config.ai.apiKey,
    apiUrl: config.ai.apiUrl,
    model: config.ai.model,
    temperature: config.ai.temperature,
    maxTokens: config.ai.maxTokens,
    topP: 1.0,
    frequencyPenalty: 0.0,
    presencePenalty: 0.0,
    timeout: 30000 // 30 seconds
  },

  // Embedding Configuration
  embeddings: {
    provider: config.ai.provider,
    apiKey: config.ai.apiKey,
    model: config.ai.embeddingModel,
    dimension: config.vectorDb.dimension,
    batchSize: 100 // Max texts per batch request
  },

  // Vector Database Configuration
  vectorDb: {
    provider: config.vectorDb.provider,
    apiKey: config.vectorDb.apiKey,
    indexName: config.vectorDb.indexName,
    dimension: config.vectorDb.dimension,
    metric: 'cosine', // cosine, euclidean, dotproduct
    namespace: 'default'
  },

  // RAG Configuration
  rag: {
    enabled: config.rag.enabled,
    chunkSize: config.rag.chunkSize,
    chunkOverlap: config.rag.chunkOverlap,
    topK: config.rag.topK,
    similarityThreshold: config.rag.similarityThreshold,
    maxContextLength: 4000, // Max characters in context
    reranking: false // Enable reranking for better results
  },

  // Guardrails Configuration
  guardrails: {
    enabled: config.guardrails.enabled,
    maxInputLength: config.guardrails.maxInputLength,
    maxOutputLength: 5000,
    moderationApiKey: config.guardrails.moderationApiKey,
    piiDetection: true,
    toxicityDetection: true,
    promptInjectionDetection: true
  },

  // Query Optimization
  queryOptimization: {
    enabled: true,
    rephraseQueries: true,
    expandQueries: false
  },

  // Conversation Configuration
  conversation: {
    maxHistoryMessages: 10,
    includeSystemPrompt: true,
    systemPrompt: `You are OLI, an intelligent AI assistant designed to help users with data analysis and insights.
You are knowledgeable, professional, and provide clear, actionable responses.
Always be helpful, accurate, and concise in your answers.`
  }
};
