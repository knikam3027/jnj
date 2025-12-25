/**
 * Chat Service
 * Handles chat business logic and orchestrates AI interactions
 */

const sessionRepository = require('../repositories/session.repository');
const messageRepository = require('../repositories/message.repository');
const aiService = require('../ai/llm.service');

/**
 * Get chat history for a user
 */
const getChatHistory = async (userId) => {
  const sessions = await sessionRepository.findByUserId(userId);
  
  // Fetch messages for each session
  const sessionsWithMessages = await Promise.all(
    sessions.map(async (session) => {
      const messages = await messageRepository.findBySessionId(session.id);
      return {
        ...session,
        messages: messages.map(msg => ({
          id: msg.id,
          content: msg.content,
          sender: msg.sender,
          timestamp: msg.created_at,
          isEditable: msg.sender === 'user'
        }))
      };
    })
  );

  return sessionsWithMessages;
};

/**
 * Send a message and get AI response
 */
const sendMessage = async (userId, messageData) => {
  const { message, sessionId } = messageData;

  if (!message || message.trim() === '') {
    throw new Error('MESSAGE_REQUIRED');
  }

  let currentSessionId = sessionId;

  // Create new session if not provided
  if (!currentSessionId) {
    const title = message.substring(0, 50) + (message.length > 50 ? '...' : '');
    const session = await sessionRepository.create({
      userId,
      title
    });
    currentSessionId = session.id;
  } else {
    // Verify session belongs to user
    const session = await sessionRepository.findById(currentSessionId);
    if (!session || session.user_id !== userId) {
      throw new Error('SESSION_NOT_FOUND');
    }
  }

  // Save user message
  const userMessage = await messageRepository.create({
    sessionId: currentSessionId,
    content: message,
    sender: 'user'
  });

  // Generate AI response using the AI service
  const botContent = await aiService.generateResponse({
    message,
    sessionId: currentSessionId,
    userId
  });

  // Save bot message
  const botMessage = await messageRepository.create({
    sessionId: currentSessionId,
    content: botContent,
    sender: 'bot'
  });

  // Update session timestamp
  await sessionRepository.updateTimestamp(currentSessionId);

  return {
    sessionId: currentSessionId,
    message: {
      id: botMessage.id,
      content: botMessage.content,
      sender: botMessage.sender,
      timestamp: botMessage.created_at
    }
  };
};

/**
 * Create a new chat session
 */
const createSession = async (userId, title = 'New Chat') => {
  const session = await sessionRepository.create({
    userId,
    title
  });

  return {
    id: session.id,
    title: session.title,
    createdAt: session.created_at,
    updatedAt: session.updated_at,
    messages: []
  };
};

/**
 * Delete a chat session
 */
const deleteSession = async (userId, sessionId) => {
  // Verify session belongs to user
  const session = await sessionRepository.findById(sessionId);
  if (!session || session.user_id !== userId) {
    throw new Error('SESSION_NOT_FOUND');
  }

  await sessionRepository.delete(sessionId);
};

/**
 * Update session title
 */
const updateSessionTitle = async (userId, sessionId, title) => {
  // Verify session belongs to user
  const session = await sessionRepository.findById(sessionId);
  if (!session || session.user_id !== userId) {
    throw new Error('SESSION_NOT_FOUND');
  }

  await sessionRepository.updateTitle(sessionId, title);
};

module.exports = {
  getChatHistory,
  sendMessage,
  createSession,
  deleteSession,
  updateSessionTitle
};
