/**
 * Data Access Layer (Repository Pattern)
 * Handles database operations and data persistence
 * 
 * Enterprise Pattern: Centralized data access
 * - All database queries go through repositories
 * - Controllers and services never directly access the database
 * - Easy to mock for testing
 * - Single source of truth for queries
 */

const userRepository = require('./user.repository');
const sessionRepository = require('./session.repository');
const messageRepository = require('./message.repository');
const tokenRepository = require('./token.repository');

module.exports = {
  userRepository,
  sessionRepository,
  messageRepository,
  tokenRepository
};
