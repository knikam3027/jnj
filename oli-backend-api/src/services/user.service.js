/**
 * User Service
 * Handles user profile business logic
 */

const userRepository = require('../repositories/user.repository');

/**
 * Get user profile by ID
 */
const getUserProfile = async (userId) => {
  const user = await userRepository.findById(userId);
  
  if (!user) {
    throw new Error('USER_NOT_FOUND');
  }

  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    name: user.name,
    role: user.role,
    avatar: user.avatar,
    created_at: user.created_at,
    updated_at: user.updated_at
  };
};

/**
 * Update user profile
 */
const updateUserProfile = async (userId, updateData) => {
  const { firstName, lastName, avatar } = updateData;

  const updates = {};

  if (firstName !== undefined) {
    updates.firstName = firstName;
  }

  if (lastName !== undefined) {
    updates.lastName = lastName;
  }

  if (avatar !== undefined) {
    updates.avatar = avatar;
  }

  // Update name if firstName or lastName changed
  if (firstName !== undefined || lastName !== undefined) {
    const user = await userRepository.findById(userId);
    const newFirstName = firstName !== undefined ? firstName : user.firstName;
    const newLastName = lastName !== undefined ? lastName : user.lastName;
    updates.name = `${newFirstName || ''} ${newLastName || ''}`.trim();
  }

  if (Object.keys(updates).length === 0) {
    throw new Error('NO_FIELDS_TO_UPDATE');
  }

  await userRepository.update(userId, updates);

  // Return updated user profile
  return await getUserProfile(userId);
};

/**
 * Get user by email
 */
const getUserByEmail = async (email) => {
  const user = await userRepository.findByEmail(email);
  
  if (!user) {
    throw new Error('USER_NOT_FOUND');
  }

  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    name: user.name,
    role: user.role,
    avatar: user.avatar
  };
};

module.exports = {
  getUserProfile,
  updateUserProfile,
  getUserByEmail
};
