/**
 * Authentication Service
 * Handles authentication business logic
 */

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/user.repository');
const tokenRepository = require('../repositories/token.repository');

/**
 * Generate JWT access and refresh tokens for a user
 */
const generateTokens = (user) => {
  const accessToken = jwt.sign(
    { 
      id: user.id, 
      email: user.email,
      role: user.role 
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '15m' }
  );

  const refreshToken = jwt.sign(
    { 
      id: user.id, 
      email: user.email 
    },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d' }
  );

  return { accessToken, refreshToken };
};

/**
 * Register a new user
 */
const registerUser = async (userData) => {
  const { email, password, firstName, lastName, role } = userData;

  // Check if user already exists
  const existingUser = await userRepository.findByEmail(email);
  if (existingUser) {
    throw new Error('USER_EXISTS');
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const name = `${firstName} ${lastName || ''}`.trim();
  const user = await userRepository.create({
    email,
    password: hashedPassword,
    firstName,
    lastName: lastName || null,
    name,
    role: role || 'user'
  });

  // Generate tokens
  const { accessToken, refreshToken } = generateTokens(user);

  // Save refresh token
  await tokenRepository.saveRefreshToken(user.id, refreshToken);

  return {
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      name: user.name,
      role: user.role,
      avatar: null
    },
    accessToken,
    refreshToken
  };
};

/**
 * Login user with email and password
 */
const loginUser = async (email, password) => {
  // Find user
  const user = await userRepository.findByEmail(email);
  if (!user) {
    throw new Error('INVALID_CREDENTIALS');
  }

  // Verify password
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw new Error('INVALID_CREDENTIALS');
  }

  // Update last login
  await userRepository.updateLastLogin(user.id);

  // Generate tokens
  const { accessToken, refreshToken } = generateTokens(user);

  // Save refresh token
  await tokenRepository.saveRefreshToken(user.id, refreshToken);

  return {
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      name: user.name,
      role: user.role,
      avatar: user.avatar
    },
    accessToken,
    refreshToken
  };
};

/**
 * Refresh access token using refresh token
 */
const refreshAccessToken = async (refreshToken) => {
  // Verify refresh token
  let decoded;
  try {
    decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
  } catch (error) {
    throw new Error('INVALID_TOKEN');
  }

  // Check if token exists in database
  const tokenRecord = await tokenRepository.findRefreshToken(refreshToken);
  if (!tokenRecord || tokenRecord.revoked) {
    throw new Error('INVALID_TOKEN');
  }

  // Get user
  const user = await userRepository.findById(decoded.id);
  if (!user) {
    throw new Error('USER_NOT_FOUND');
  }

  // Generate new access token
  const accessToken = jwt.sign(
    { 
      id: user.id, 
      email: user.email,
      role: user.role 
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '15m' }
  );

  return { accessToken };
};

/**
 * Logout user and revoke refresh token
 */
const logoutUser = async (refreshToken) => {
  if (refreshToken) {
    await tokenRepository.revokeRefreshToken(refreshToken);
  }
};

module.exports = {
  registerUser,
  loginUser,
  refreshAccessToken,
  logoutUser,
  generateTokens
};
