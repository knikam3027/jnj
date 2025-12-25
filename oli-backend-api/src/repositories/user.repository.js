/**
 * User Repository
 * Handles all database operations for users
 * 
 * Enterprise Pattern: Repository Pattern
 * - Abstracts database access
 * - Centralizes query logic
 * - Makes testing easier with mock repositories
 */

const db = require('../config/database');

/**
 * Find user by ID
 */
const findById = async (userId) => {
  const [users] = await db.query(
    'SELECT * FROM users WHERE id = ?',
    [userId]
  );
  return users[0] || null;
};

/**
 * Find user by email
 */
const findByEmail = async (email) => {
  const [users] = await db.query(
    'SELECT * FROM users WHERE email = ?',
    [email]
  );
  return users[0] || null;
};

/**
 * Create a new user
 */
const create = async (userData) => {
  const { email, password, firstName, lastName, name, role } = userData;
  
  const [result] = await db.query(
    `INSERT INTO users (email, password, firstName, lastName, name, role, created_at, updated_at) 
     VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())`,
    [email, password, firstName, lastName, name, role]
  );

  return {
    id: result.insertId,
    email,
    firstName,
    lastName,
    name,
    role
  };
};

/**
 * Update user data
 */
const update = async (userId, updates) => {
  const fields = [];
  const values = [];

  for (const [key, value] of Object.entries(updates)) {
    fields.push(`${key} = ?`);
    values.push(value);
  }

  fields.push('updated_at = NOW()');
  values.push(userId);

  await db.query(
    `UPDATE users SET ${fields.join(', ')} WHERE id = ?`,
    values
  );

  return await findById(userId);
};

/**
 * Update last login timestamp
 */
const updateLastLogin = async (userId) => {
  await db.query(
    'UPDATE users SET last_login = NOW() WHERE id = ?',
    [userId]
  );
};

/**
 * Delete user
 */
const deleteUser = async (userId) => {
  await db.query('DELETE FROM users WHERE id = ?', [userId]);
};

/**
 * Find all users (admin only)
 */
const findAll = async (filters = {}) => {
  let query = 'SELECT id, email, firstName, lastName, name, role, avatar, created_at, updated_at FROM users';
  const conditions = [];
  const values = [];

  if (filters.role) {
    conditions.push('role = ?');
    values.push(filters.role);
  }

  if (conditions.length > 0) {
    query += ' WHERE ' + conditions.join(' AND ');
  }

  query += ' ORDER BY created_at DESC';

  const [users] = await db.query(query, values);
  return users;
};

/**
 * Count total users
 */
const count = async () => {
  const [result] = await db.query('SELECT COUNT(*) as total FROM users');
  return result[0].total;
};

module.exports = {
  findById,
  findByEmail,
  create,
  update,
  updateLastLogin,
  deleteUser,
  findAll,
  count
};
