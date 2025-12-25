-- Quick setup script for testing
-- Run this if you don't have MySQL command line
-- Or import this file in MySQL Workbench / phpMyAdmin

DROP DATABASE IF EXISTS oli_db;
CREATE DATABASE oli_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE oli_db;

-- Users table
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255),
  firstName VARCHAR(255),
  lastName VARCHAR(255),
  name VARCHAR(255),
  role VARCHAR(50) DEFAULT 'user',
  avatar VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Refresh tokens table
CREATE TABLE refresh_tokens (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  token VARCHAR(500) NOT NULL UNIQUE,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id),
  INDEX idx_token (token)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Chat sessions table
CREATE TABLE chat_sessions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  title VARCHAR(500) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id),
  INDEX idx_updated_at (updated_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Messages table
CREATE TABLE messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  session_id INT NOT NULL,
  content TEXT NOT NULL,
  sender ENUM('user', 'bot') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (session_id) REFERENCES chat_sessions(id) ON DELETE CASCADE,
  INDEX idx_session_id (session_id),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert test user: admin@jnj.com / admin
INSERT INTO users (email, password, firstName, lastName, name, role) VALUES
('admin@jnj.com', '$2a$10$YQ98PEbD7Vr8j9kXqZqP6.rKJ5JqF7p6rL5AvN/5Q8qH5YxKzGr4W', 'Admin', 'User', 'Admin User', 'admin');

-- Insert sample user
INSERT INTO users (email, password, firstName, lastName, name, role) VALUES
('johnsmith@jis.jnj.com', '$2a$10$YQ98PEbD7Vr8j9kXqZqP6.rKJ5JqF7p6rL5AvN/5Q8qH5YxKzGr4W', 'John', 'Smith', 'John Smith', 'user');
