/**
 * Chat Controller
 * Handles HTTP requests for chat operations
 * 
 * Enterprise Pattern: Thin Controllers
 * - Controllers only handle request/response
 * - Business logic delegated to services
 * - Clean separation of concerns
 */

const chatService = require('../services/chat.service');

// GET /api/chat/history
exports.getChatHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const sessions = await chatService.getChatHistory(userId);
    
    res.status(200).json(sessions);

  } catch (error) {
    console.error('Get chat history error:', error);
    res.status(500).json({ error: 'Failed to retrieve chat history' });
  }
};

// POST /api/chat/message
exports.sendMessage = async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await chatService.sendMessage(userId, req.body);
    
    res.status(200).json(result);

  } catch (error) {
    console.error('Send message error:', error);
    
    if (error.message === 'MESSAGE_REQUIRED') {
      return res.status(400).json({ error: 'Message is required' });
    }
    
    if (error.message === 'SESSION_NOT_FOUND') {
      return res.status(404).json({ error: 'Session not found' });
    }
    
    res.status(500).json({ error: 'Failed to send message' });
  }
};

// GET /api/chat/session/:id
exports.getChatSession = async (req, res) => {
  try {
    const userId = req.user.id;
    const sessionId = req.params.id;

    const sessions = await chatService.getChatHistory(userId);
    const session = sessions.find(s => s.id === parseInt(sessionId));

    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    res.status(200).json(session);

  } catch (error) {
    console.error('Get chat session error:', error);
    res.status(500).json({ error: 'Failed to retrieve session' });
  }
};

// DELETE /api/chat/session/:id
exports.deleteChatSession = async (req, res) => {
  try {
    const userId = req.user.id;
    const sessionId = req.params.id;

    await chatService.deleteSession(userId, sessionId);
    
    res.status(200).json({ message: 'Session deleted successfully' });

  } catch (error) {
    console.error('Delete chat session error:', error);
    
    if (error.message === 'SESSION_NOT_FOUND') {
      return res.status(404).json({ error: 'Session not found' });
    }
    
    res.status(500).json({ error: 'Failed to delete session' });
  }
};

