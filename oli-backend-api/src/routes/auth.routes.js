const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { body } = require('express-validator');

// POST /api/auth/register - Create new user account
router.post('/register', 
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('firstName').notEmpty().withMessage('First name is required'),
    body('role').optional()
  ],
  authController.register
);

// POST /api/auth/login - Sign in with email and password
router.post('/login', 
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required')
  ],
  authController.login
);

// POST /api/auth/refresh - Refresh access token
router.post('/refresh',
  [
    body('refreshToken').notEmpty().withMessage('Refresh token is required')
  ],
  authController.refresh
);

// POST /api/auth/logout - Sign out and invalidate refresh token
router.post('/logout',
  [
    body('refreshToken').notEmpty().withMessage('Refresh token is required')
  ],
  authController.logout
);

// GET /auth/sso - SSO redirect endpoint
router.get('/sso', authController.ssoLogin);

module.exports = router;
