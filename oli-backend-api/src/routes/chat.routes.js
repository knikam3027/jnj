const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chat.controller');
const authMiddleware = require('../middleware/auth.middleware');

// All chat routes require authentication
router.use(authMiddleware);

// GET /api/chat/history
router.get('/history', chatController.getChatHistory);

// POST /api/chat/message
router.post('/message', chatController.sendMessage);

// GET /api/chat/session/:id
router.get('/session/:id', chatController.getChatSession);

// DELETE /api/chat/session/:id
router.delete('/session/:id', chatController.deleteChatSession);

module.exports = router;
