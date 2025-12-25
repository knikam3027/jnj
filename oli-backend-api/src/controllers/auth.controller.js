/**
 * Authentication Controller
 * Handles HTTP requests for authentication
 * 
 * Enterprise Pattern: Thin Controllers
 * - Controllers only handle request/response
 * - Business logic delegated to services
 * - Clean separation of concerns
 */

const { validationResult } = require('express-validator');
const authService = require('../services/auth.service');

// POST /api/auth/register
exports.register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const result = await authService.registerUser(req.body);
    res.status(201).json(result);

  } catch (error) {
    console.error('Registration error:', error);
    
    if (error.message === 'USER_EXISTS') {
      return res.status(400).json({ error: 'User already exists' });
    }
    
    res.status(500).json({ error: 'Registration failed' });
  }
};

// POST /api/auth/login
exports.login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const result = await authService.loginUser(email, password);
    
    res.status(200).json(result);

  } catch (error) {
    console.error('Login error:', error);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    
    if (error.message === 'INVALID_CREDENTIALS') {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    
    res.status(500).json({ error: 'Login failed', details: error.message });
  }
};

// POST /api/auth/refresh
exports.refresh = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { refreshToken } = req.body;
    const result = await authService.refreshAccessToken(refreshToken);
    
    res.status(200).json(result);

  } catch (error) {
    console.error('Refresh token error:', error);
    
    if (error.message === 'INVALID_TOKEN') {
      return res.status(401).json({ error: 'Invalid or expired refresh token' });
    }
    
    if (error.message === 'USER_NOT_FOUND') {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.status(500).json({ error: 'Token refresh failed' });
  }
};

// POST /api/auth/logout
exports.logout = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { refreshToken } = req.body;
    await authService.logoutUser(refreshToken);
    
    res.status(200).json({ loggedOut: true });

  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ error: 'Logout failed' });
  }
};

// GET /auth/sso
exports.ssoLogin = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // SSO flow - create/login user and redirect
    // Note: In production, validate SSO token from identity provider
    const result = await authService.loginUser(email, null, { ssoMode: true });
    
    // Redirect to frontend with token
    const redirectUrl = `${process.env.SSO_REDIRECT_URL || process.env.FRONTEND_URL}?token=${result.accessToken}`;
    res.redirect(redirectUrl);

  } catch (error) {
    console.error('SSO login error:', error);
    res.status(500).json({ error: 'SSO login failed' });
  }
};

