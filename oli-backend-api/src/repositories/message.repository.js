/**
 * Message Repository
 * Handles all database operations for chat messages
 */

const db = require('../config/database');

/**
 * Find message by ID
 */
const findById = async (messageId) => {
  const [messages] = await db.query(
    'SELECT * FROM messages WHERE id = ?',
    [messageId]
  );
  return messages[0] || null;
};

/**
 * Find all messages for a session
 */
const findBySessionId = async (sessionId) => {
  const [messages] = await db.query(
    `SELECT 
      id, 
      session_id, 
      content, 
      sender, 
      created_at 
    FROM messages 
    WHERE session_id = ? 
    ORDER BY created_at ASC`,
    [sessionId]
  );
  return messages;
};

/**
 * Create a new message
 */
const create = async (messageData) => {
  const { sessionId, content, sender } = messageData;
  
  const [result] = await db.query(
    'INSERT INTO messages (session_id, content, sender, created_at) VALUES (?, ?, ?, NOW())',
    [sessionId, content, sender]
  );

  return {
    id: result.insertId,
    session_id: sessionId,
    content,
    sender,
    created_at: new Date()
  };
};

/**
 * Update message content (for user messages only)
 */
const update = async (messageId, content) => {
  await db.query(
    'UPDATE messages SET content = ? WHERE id = ? AND sender = ?',
    [content, messageId, 'user']
  );
};

/**
 * Delete a message
 */
const deleteMessage = async (messageId) => {
  await db.query('DELETE FROM messages WHERE id = ?', [messageId]);
};

/**
 * Delete all messages for a session
 */
const deleteBySessionId = async (sessionId) => {
  await db.query('DELETE FROM messages WHERE session_id = ?', [sessionId]);
};

/**
 * Count messages in a session
 */
const countBySessionId = async (sessionId) => {
  const [result] = await db.query(
    'SELECT COUNT(*) as total FROM messages WHERE session_id = ?',
    [sessionId]
  );
  return result[0].total;
};

/**
 * Get latest N messages from a session
 */
const getLatestMessages = async (sessionId, limit = 10) => {
  const [messages] = await db.query(
    `SELECT * FROM messages 
     WHERE session_id = ? 
     ORDER BY created_at DESC 
     LIMIT ?`,
    [sessionId, limit]
  );
  return messages.reverse(); // Return in chronological order
};

module.exports = {
  findById,
  findBySessionId,
  create,
  update,
  delete: deleteMessage,
  deleteBySessionId,
  countBySessionId,
  getLatestMessages
};
