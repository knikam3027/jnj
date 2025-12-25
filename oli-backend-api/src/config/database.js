/**
 * Database Configuration
 * MySQL connection pool setup
 * 
 * Enterprise Pattern: Connection Pooling
 * - Reuses database connections
 * - Better performance under load
 * - Automatic reconnection handling
 */

const mysql = require('mysql2/promise');
const config = require('./env');

const pool = mysql.createPool({
  host: config.database.host,
  port: config.database.port,
  user: config.database.user,
  password: config.database.password,
  database: config.database.name,
  waitForConnections: true,
  connectionLimit: config.database.connectionLimit,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
  // Azure MySQL SSL Configuration
  ssl: {
    rejectUnauthorized: false // For Azure MySQL
  },
  // Additional production settings
  connectTimeout: 10000,
  timezone: 'Z',
  charset: 'utf8mb4',
  supportBigNumbers: true,
  bigNumberStrings: false,
  dateStrings: false
});

// Test database connection on startup
pool.getConnection()
  .then(connection => {
    console.log('✅ Database connected successfully');
    console.log(`   Host: ${config.database.host}:${config.database.port}`);
    console.log(`   Database: ${config.database.name}`);
    connection.release();
  })
  .catch(err => {
    console.error('❌ Database connection failed:', err.message);
    if (config.server.env === 'production') {
      process.exit(1); // Exit in production if database is unavailable
    }
  });

// Handle pool errors
pool.on('error', (err) => {
  console.error('Database pool error:', err);
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    console.log('Database connection lost. Pool will reconnect automatically.');
  }
});

module.exports = pool;
