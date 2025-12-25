/**
 * Query Rephrase Service
 * Optimizes user queries for better retrieval and understanding
 * 
 * Enterprise Architecture:
 * - Expands ambiguous queries
 * - Resolves pronouns and references
 * - Adds context from conversation history
 * - Improves search relevance
 */

const messageRepository = require('../repositories/message.repository');

/**
 * Optimize query for better retrieval
 */
const optimizeQuery = async (query, sessionId) => {
  try {
    if (!query || query.trim() === '') {
      return query;
    }

    // If no session, return original query
    if (!sessionId) {
      return query;
    }

    // Get conversation history
    const history = await getRecentHistory(sessionId, 5);

    // Check if query needs rephrasing
    if (!needsRephrasing(query, history)) {
      return query;
    }

    // Rephrase with context
    const rephrasedQuery = await rephraseWithContext(query, history);

    return rephrasedQuery;

  } catch (error) {
    console.error('Query rephrase error:', error);
    // Return original query on error
    return query;
  }
};

/**
 * Check if query needs rephrasing
 */
const needsRephrasing = (query, history) => {
  // Check for pronouns that need resolution
  const pronouns = ['it', 'this', 'that', 'they', 'them', 'these', 'those'];
  const lowerQuery = query.toLowerCase();
  
  const hasPronouns = pronouns.some(pronoun => 
    lowerQuery.includes(` ${pronoun} `) || 
    lowerQuery.startsWith(`${pronoun} `)
  );

  // Check if query is too short or ambiguous
  const isTooShort = query.split(' ').length < 3;

  // Check if query is a follow-up question
  const followUpIndicators = ['also', 'additionally', 'furthermore', 'what about', 'and'];
  const isFollowUp = followUpIndicators.some(indicator => 
    lowerQuery.includes(indicator)
  );

  return hasPronouns || (isTooShort && history.length > 0) || isFollowUp;
};

/**
 * Rephrase query with conversation context
 */
const rephraseWithContext = async (query, history) => {
  // TODO: Use LLM to intelligently rephrase the query
  // For now, use simple context concatenation

  if (history.length === 0) {
    return query;
  }

  // Get last user message for context
  const lastUserMessage = history
    .reverse()
    .find(msg => msg.sender === 'user');

  if (!lastUserMessage) {
    return query;
  }

  // Simple rephrasing: combine with previous context
  const contextualQuery = `${lastUserMessage.content.substring(0, 100)}. ${query}`;

  /* Production implementation with LLM:
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  
  const systemPrompt = `You are a query optimizer. Rephrase the user's follow-up question to be standalone by incorporating relevant context from the conversation history.
  
Return only the rephrased question, nothing else.`;

  const messages = [
    { role: 'system', content: systemPrompt },
    ...history.slice(-3).map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'assistant',
      content: msg.content
    })),
    { 
      role: 'user', 
      content: `Rephrase this follow-up question to be standalone: "${query}"` 
    }
  ];

  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: messages,
    temperature: 0.3,
    max_tokens: 150
  });

  return completion.choices[0].message.content.trim();
  */

  return query; // Return original for now
};

/**
 * Get recent conversation history
 */
const getRecentHistory = async (sessionId, limit = 5) => {
  try {
    const messages = await messageRepository.findBySessionId(sessionId);
    return messages.slice(-limit);
  } catch (error) {
    console.error('Error fetching history:', error);
    return [];
  }
};

/**
 * Expand query with synonyms and related terms
 * Useful for keyword-based search systems
 */
const expandQuery = (query) => {
  // TODO: Implement query expansion with synonyms
  // Can use WordNet, word embeddings, or LLM

  return query;
};

module.exports = {
  optimizeQuery,
  needsRephrasing,
  expandQuery
};
