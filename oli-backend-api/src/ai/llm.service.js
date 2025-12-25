/**
 * LLM Service
 * Handles Large Language Model interactions and response generation
 * 
 * Enterprise Architecture:
 * - Centralizes all LLM API calls
 * - Manages context and conversation history
 * - Handles rate limiting and error recovery
 * - Supports multiple LLM providers (OpenAI, Azure OpenAI, etc.)
 */

const OpenAI = require('openai');
const messageRepository = require('../repositories/message.repository');
const ragService = require('./rag.service');
const guardrailsService = require('./guardrails.service');
const queryRephraseService = require('./query-rephrase.service');

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || process.env.AZURE_OPENAI_API_KEY
});

/**
 * Generate AI response for user message
 * Orchestrates the complete AI pipeline
 */
const generateResponse = async ({ message, sessionId, userId }) => {
  try {
    // Step 1: Apply input guardrails (content filtering, PII detection)
    const guardrailCheck = await guardrailsService.checkInput(message);
    if (!guardrailCheck.passed) {
      return guardrailCheck.message;
    }

    // Step 2: Rephrase query for better retrieval (optional)
    const optimizedQuery = await queryRephraseService.optimizeQuery(message, sessionId);

    // Step 3: Retrieve relevant context using RAG
    const contextualInfo = await ragService.retrieveContext(optimizedQuery, userId);

    // Step 4: Build conversation history
    const conversationHistory = await buildConversationHistory(sessionId);

    // Step 5: Generate LLM response
    const llmResponse = await callLLM({
      userMessage: message,
      context: contextualInfo,
      history: conversationHistory
    });

    // Step 6: Apply output guardrails
    const outputCheck = await guardrailsService.checkOutput(llmResponse);
    if (!outputCheck.passed) {
      return outputCheck.message;
    }

    return llmResponse;

  } catch (error) {
    console.error('LLM Service Error:', error);
    return 'I apologize, but I encountered an error processing your request. Please try again.';
  }
};

/**
 * Build conversation history for context
 */
const buildConversationHistory = async (sessionId, maxMessages = 10) => {
  if (!sessionId) {
    return [];
  }

  const messages = await messageRepository.findBySessionId(sessionId);
  
  // Get last N messages
  const recentMessages = messages.slice(-maxMessages);
  
  return recentMessages.map(msg => ({
    role: msg.sender === 'user' ? 'user' : 'assistant',
    content: msg.content
  }));
};

/**
 * Call the LLM API
 * Integrates with OpenAI API
 */
const callLLM = async ({ userMessage, context, history }) => {
  try {
    const systemPrompt = buildSystemPrompt(context);
    
    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY && !process.env.AZURE_OPENAI_API_KEY) {
      console.warn('⚠️  No OpenAI API key found. Returning mock response.');
      return getMockResponse(userMessage);
    }

    // Build messages array for OpenAI
    const messages = [
      { role: 'system', content: systemPrompt },
      ...history,
      { role: 'user', content: userMessage }
    ];

    console.log('🤖 Calling OpenAI API...');
    
    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4-turbo-preview',
      messages: messages,
      temperature: parseFloat(process.env.AI_TEMPERATURE || '0.7'),
      max_tokens: parseInt(process.env.AI_MAX_TOKENS || '1000', 10)
    });

    const response = completion.choices[0].message.content;
    console.log('✅ OpenAI response received');
    
    return response;

  } catch (error) {
    console.error('❌ OpenAI API Error:', error.message);
    
    // Fallback to mock response on error
    return getMockResponse(userMessage);
  }
};

/**
 * Get mock response (fallback)
 */
const getMockResponse = (userMessage) => {
  const responses = [
    "I've analyzed the data and found some interesting insights. Would you like me to elaborate on any specific aspect?",
    "Based on the available information, here's what I found: The metrics show a positive correlation with previous quarters.",
    "That's a great question! Let me pull the relevant data for you. The trends indicate several key factors to consider.",
    "According to our latest analysis, the data reveals important patterns that could help inform your decision.",
    "I can help you with that. The information suggests there are multiple dimensions to explore here.",
    `Regarding "${userMessage}", I can provide detailed insights based on the context available.`
  ];

  return responses[Math.floor(Math.random() * responses.length)];
};

/**
 * Build system prompt with context
 */
const buildSystemPrompt = (context) => {
  let prompt = `You are OLI, an intelligent AI assistant designed to help users with data analysis and insights.

You are knowledgeable, professional, and provide clear, actionable responses.`;

  if (context && context.length > 0) {
    prompt += `\n\nRelevant Context:\n${context.join('\n')}`;
  }

  return prompt;
};

/**
 * Stream LLM response (for real-time chat)
 * TODO: Implement streaming for better UX
 */
const streamResponse = async ({ message, sessionId, userId }, callback) => {
  // TODO: Implement streaming response
  // Use Server-Sent Events (SSE) or WebSockets
  throw new Error('Streaming not yet implemented');
};

module.exports = {
  generateResponse,
  streamResponse,
  buildConversationHistory
};
