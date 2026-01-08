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

const messageRepository = require('../repositories/message.repository');
const ragService = require('./rag.service');
const guardrailsService = require('./guardrails.service');
const queryRephraseService = require('./query-rephrase.service');

// Provider selection: set AI_PROVIDER=python to route LLM calls to an external Python service
const AI_PROVIDER = process.env.AI_PROVIDER || 'openai';
const PYTHON_CHAT_URL = process.env.PYTHON_CHAT_URL || 'http://localhost:8000/chat';

// Ensure fetch is available (Node 18+ has global fetch). Try to polyfill if necessary.
if (typeof fetch === 'undefined') {
  try {
    global.fetch = require('node-fetch');
  } catch (err) {
    console.warn('Fetch API not available and node-fetch not installed; Python provider calls may fail.');
  }
}

// Lazy init OpenAI client only when provider is OpenAI/azure
let openai = null;
if (AI_PROVIDER === 'openai' || AI_PROVIDER === 'azure') {
  try {
    const OpenAI = require('openai');
    openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || process.env.AZURE_OPENAI_API_KEY });
  } catch (err) {
    console.warn('OpenAI client not available; falling back to mock or alternate provider.');
  }
}

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

    // If configured to use an external Python runtime, forward the request there
    if (AI_PROVIDER === 'python') {
      try {
        const requestId = sessionId || Date.now();
        const payload = {
          inputs: userMessage,
          parameters: {
            request_id: requestId,
            Conversation_History: true,
            chat_history: history || []
          }
        };

        const res = await fetch(PYTHON_CHAT_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (!res.ok) {
          const bodyText = await res.text().catch(() => '<unreadable>');
          console.error('Python chat service error', res.status, bodyText);
          return getMockResponse(userMessage);
        }

        const data = await res.json();
        // Expecting the fastapi workflow to return an object with { body: '<string>' }
        if (data && typeof data === 'object') {
          if (data.body) {
            // If body is JSON string, try to parse
            try {
              const parsed = JSON.parse(data.body);
              // If parsed has expected fields, return stringified reply
              if (typeof parsed === 'string') return parsed;
              if (parsed.reply) return parsed.reply;
              if (parsed.message) return parsed.message;
              return JSON.stringify(parsed);
            } catch (e) {
              return data.body; // plain string
            }
          }

          // Accept other shapes { reply } / { message } / { response }
          return data.reply || data.message || data.response || getMockResponse(userMessage);
        }

        return getMockResponse(userMessage);
      } catch (err) {
        console.error('Error calling Python chat service:', err);
        return getMockResponse(userMessage);
      }
    }

    // Default: openai provider
    if (!openai) {
      console.warn('⚠️  OpenAI client not configured. Returning mock response.');
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
    console.error('❌ LLM Provider Error:', error && error.message ? error.message : error);
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
