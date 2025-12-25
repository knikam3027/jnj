const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middleware/auth.middleware');

// All user routes require authentication
router.use(authMiddleware);

// GET /api/users/me - Get current user profile
router.get('/me', userController.getProfile);

// PATCH /api/users/me - Update current user profile
router.patch('/me', userController.updateProfile);

module.exports = router;
