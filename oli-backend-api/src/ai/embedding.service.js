/**
 * Embedding Service
 * Handles text-to-vector embeddings for semantic search
 * 
 * Enterprise Architecture:
 * - Generates embeddings for text chunks
 * - Supports multiple embedding models
 * - Caches embeddings for performance
 * - Handles batch processing
 */

/**
 * Generate embedding vector for text
 */
const generateEmbedding = async (text) => {
  try {
    if (!text || text.trim() === '') {
      throw new Error('Text is required for embedding generation');
    }

    // Clean and normalize text
    const cleanedText = cleanText(text);

    // TODO: Integrate with embedding API
    // Options:
    // - OpenAI text-embedding-ada-002
    // - OpenAI text-embedding-3-small
    // - OpenAI text-embedding-3-large
    // - Azure OpenAI embeddings
    // - Cohere embeddings
    // - Local models (sentence-transformers)

    // Mock implementation - return random vector
    const embeddingDimension = 1536; // OpenAI ada-002 dimension
    const mockEmbedding = Array.from(
      { length: embeddingDimension }, 
      () => Math.random() * 2 - 1
    );

    return mockEmbedding;

    /* Production implementation example (OpenAI):
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    
    const response = await openai.embeddings.create({
      model: 'text-embedding-ada-002',
      input: cleanedText,
    });

    return response.data[0].embedding;
    */

  } catch (error) {
    console.error('Embedding generation error:', error);
    throw error;
  }
};

/**
 * Generate embeddings for multiple texts (batch processing)
 */
const generateEmbeddings = async (texts) => {
  try {
    if (!Array.isArray(texts) || texts.length === 0) {
      throw new Error('Texts array is required');
    }

    // Clean all texts
    const cleanedTexts = texts.map(text => cleanText(text));

    // TODO: Implement batch embedding generation
    // Most providers support batch requests for efficiency

    // For now, generate individually
    const embeddings = await Promise.all(
      cleanedTexts.map(text => generateEmbedding(text))
    );

    return embeddings;

    /* Production implementation example (OpenAI batch):
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    
    const response = await openai.embeddings.create({
      model: 'text-embedding-ada-002',
      input: cleanedTexts,
    });

    return response.data.map(item => item.embedding);
    */

  } catch (error) {
    console.error('Batch embedding generation error:', error);
    throw error;
  }
};

/**
 * Calculate cosine similarity between two vectors
 */
const cosineSimilarity = (vecA, vecB) => {
  if (vecA.length !== vecB.length) {
    throw new Error('Vectors must have the same dimension');
  }

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }

  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
};

/**
 * Clean and normalize text for embedding
 */
const cleanText = (text) => {
  if (!text) return '';

  return text
    .trim()
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .replace(/\n+/g, '\n') // Replace multiple newlines with single newline
    .substring(0, 8000); // Limit text length (most models have token limits)
};

/**
 * Cache for embeddings (in-memory, consider Redis for production)
 */
const embeddingCache = new Map();

/**
 * Generate embedding with caching
 */
const generateEmbeddingCached = async (text) => {
  const cacheKey = hashText(text);
  
  if (embeddingCache.has(cacheKey)) {
    return embeddingCache.get(cacheKey);
  }

  const embedding = await generateEmbedding(text);
  embeddingCache.set(cacheKey, embedding);

  // Limit cache size (LRU eviction)
  if (embeddingCache.size > 1000) {
    const firstKey = embeddingCache.keys().next().value;
    embeddingCache.delete(firstKey);
  }

  return embedding;
};

/**
 * Simple hash function for text
 */
const hashText = (text) => {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    const char = text.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return hash.toString(36);
};

module.exports = {
  generateEmbedding,
  generateEmbeddings,
  generateEmbeddingCached,
  cosineSimilarity,
  cleanText
};
