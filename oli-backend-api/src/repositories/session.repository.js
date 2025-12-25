/**
 * Session Repository
 * Handles all database operations for chat sessions
 */

const db = require('../config/database');

/**
 * Find session by ID
 */
const findById = async (sessionId) => {
  const [sessions] = await db.query(
    'SELECT * FROM chat_sessions WHERE id = ?',
    [sessionId]
  );
  return sessions[0] || null;
};

/**
 * Find all sessions for a user
 */
const findByUserId = async (userId) => {
  const [sessions] = await db.query(
    `SELECT 
      id, 
      user_id, 
      title, 
      created_at as createdAt, 
      updated_at as updatedAt 
    FROM chat_sessions 
    WHERE user_id = ? 
    ORDER BY updated_at DESC`,
    [userId]
  );
  return sessions;
};

/**
 * Create a new chat session
 */
const create = async (sessionData) => {
  const { userId, title } = sessionData;
  
  const [result] = await db.query(
    'INSERT INTO chat_sessions (user_id, title, created_at, updated_at) VALUES (?, ?, NOW(), NOW())',
    [userId, title]
  );

  return {
    id: result.insertId,
    user_id: userId,
    title,
    created_at: new Date(),
    updated_at: new Date()
  };
};

/**
 * Update session title
 */
const updateTitle = async (sessionId, title) => {
  await db.query(
    'UPDATE chat_sessions SET title = ?, updated_at = NOW() WHERE id = ?',
    [title, sessionId]
  );
};

/**
 * Update session timestamp
 */
const updateTimestamp = async (sessionId) => {
  await db.query(
    'UPDATE chat_sessions SET updated_at = NOW() WHERE id = ?',
    [sessionId]
  );
};

/**
 * Delete a session and its messages
 */
const deleteSession = async (sessionId) => {
  // Messages will be deleted via CASCADE in database schema
  await db.query('DELETE FROM chat_sessions WHERE id = ?', [sessionId]);
};

/**
 * Count sessions for a user
 */
const countByUserId = async (userId) => {
  const [result] = await db.query(
    'SELECT COUNT(*) as total FROM chat_sessions WHERE user_id = ?',
    [userId]
  );
  return result[0].total;
};

module.exports = {
  findById,
  findByUserId,
  create,
  updateTitle,
  updateTimestamp,
  delete: deleteSession,
  countByUserId
};
