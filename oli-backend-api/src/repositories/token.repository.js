/**
 * Token Repository
 * Handles all database operations for refresh tokens
 */

const db = require('../config/database');

/**
 * Save a refresh token
 */
const saveRefreshToken = async (userId, token) => {
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7); // 7 days

  await db.query(
    'INSERT INTO refresh_tokens (user_id, token, expires_at, created_at) VALUES (?, ?, ?, NOW())',
    [userId, token, expiresAt]
  );
};

/**
 * Find refresh token
 */
const findRefreshToken = async (token) => {
  const [tokens] = await db.query(
    'SELECT * FROM refresh_tokens WHERE token = ? AND expires_at > NOW()',
    [token]
  );
  return tokens[0] || null;
};

/**
 * Revoke refresh token
 */
const revokeRefreshToken = async (token) => {
  await db.query(
    'UPDATE refresh_tokens SET revoked = TRUE WHERE token = ?',
    [token]
  );
};

/**
 * Revoke all tokens for a user
 */
const revokeAllUserTokens = async (userId) => {
  await db.query(
    'UPDATE refresh_tokens SET revoked = TRUE WHERE user_id = ?',
    [userId]
  );
};

/**
 * Clean up expired tokens
 */
const cleanupExpiredTokens = async () => {
  await db.query(
    'DELETE FROM refresh_tokens WHERE expires_at < NOW() OR revoked = TRUE'
  );
};

/**
 * Find all active tokens for a user
 */
const findActiveTokensByUserId = async (userId) => {
  const [tokens] = await db.query(
    `SELECT * FROM refresh_tokens 
     WHERE user_id = ? 
     AND expires_at > NOW() 
     AND revoked = FALSE`,
    [userId]
  );
  return tokens;
};

module.exports = {
  saveRefreshToken,
  findRefreshToken,
  revokeRefreshToken,
  revokeAllUserTokens,
  cleanupExpiredTokens,
  findActiveTokensByUserId
};
