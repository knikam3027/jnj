/**
 * User Controller
 * Handles HTTP requests for user operations
 * 
 * Enterprise Pattern: Thin Controllers
 * - Controllers only handle request/response
 * - Business logic delegated to services
 * - Clean separation of concerns
 */

const userService = require('../services/user.service');

// GET /api/users/me - Get current user profile
exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const profile = await userService.getUserProfile(userId);
    
    res.status(200).json(profile);

  } catch (error) {
    console.error('Get profile error:', error);
    
    if (error.message === 'USER_NOT_FOUND') {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.status(500).json({ error: 'Failed to get profile' });
  }
};

// PATCH /api/users/me - Update current user profile
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const updatedProfile = await userService.updateUserProfile(userId, req.body);
    
    res.status(200).json(updatedProfile);

  } catch (error) {
    console.error('Update profile error:', error);
    
    if (error.message === 'NO_FIELDS_TO_UPDATE') {
      return res.status(400).json({ error: 'No fields to update' });
    }
    
    if (error.message === 'USER_NOT_FOUND') {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.status(500).json({ error: 'Failed to update profile' });
  }
};

