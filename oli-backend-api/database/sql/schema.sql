-- OLI Database Schema

-- Create database
CREATE DATABASE IF NOT EXISTS oli_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE oli_db;

-- Users table
CREATE TABLE IF NOT EXISTS users (
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
CREATE TABLE IF NOT EXISTS refresh_tokens (
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
CREATE TABLE IF NOT EXISTS chat_sessions (
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
CREATE TABLE IF NOT EXISTS messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  session_id INT NOT NULL,
  content TEXT NOT NULL,
  sender ENUM('user', 'bot') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (session_id) REFERENCES chat_sessions(id) ON DELETE CASCADE,
  INDEX idx_session_id (session_id),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert sample data (password is 'admin' hashed with bcrypt)
-- Use this for testing: email: admin@jnj.com, password: admin
INSERT INTO users (email, password, firstName, lastName, name, role) VALUES
('admin@jnj.com', '$2a$10$YQ98PEbD7Vr8j9kXqZqP6.rKJ5JqF7p6rL5AvN/5Q8qH5YxKzGr4W', 'Admin', 'User', 'Admin User', 'admin'),
('johnsmith@jis.jnj.com', '$2a$10$YQ98PEbD7Vr8j9kXqZqP6.rKJ5JqF7p6rL5AvN/5Q8qH5YxKzGr4W', 'John', 'Smith', 'John Smith', 'user'),
('test@example.com', '$2a$10$YQ98PEbD7Vr8j9kXqZqP6.rKJ5JqF7p6rL5AvN/5Q8qH5YxKzGr4W', 'Test', 'User', 'Test User', 'user');

-- Insert sample chat sessions
INSERT INTO chat_sessions (user_id, title, created_at, updated_at) VALUES
(1, 'How much money is lost in the returns and refus...', '2025-12-24 09:30:00', '2025-12-24 09:30:00'),
(1, 'Are there certain customers that usually over-ord...', '2025-12-24 09:32:00', '2025-12-24 09:32:00'),
(1, 'Revenue forecast Q1 2026', '2025-12-20 14:20:00', '2025-12-20 14:20:00');

-- Insert sample messages
INSERT INTO messages (session_id, content, sender, created_at) VALUES
(1, 'How much money is lost in the returns and refusals?', 'user', '2025-12-24 09:30:00'),
(1, 'Based on our latest analysis, approximately $2.5M is lost annually due to returns and refusals. This represents about 3.2% of total revenue.\n\nKey breakdown:\n- Product returns: $1.8M (72%)\n- Order refusals: $700K (28%)\n\nMain causes include:\n1. Quality issues (35%)\n2. Wrong product delivered (25%)\n3. Customer changed mind (20%)\n4. Damaged in shipping (15%)\n5. Other (5%)', 'bot', '2025-12-24 09:30:15'),
(2, 'Are there certain customers that usually over-order and then have a high number of returns?', 'user', '2025-12-24 09:32:00'),
(2, 'Yes – 18% of customers (top 50) account for 22% of returned units and have an average returns per order ratio 4× company median.\n\nExample metric: customers flagged "high over-order" = orders with return_rate_per_customer > 40% and avg_order_size > X units.', 'bot', '2025-12-24 09:32:15'),
(3, 'What is the revenue forecast for Q1 2026?', 'user', '2025-12-20 14:20:00'),
(3, 'Based on current trends and historical data, the Q1 2026 revenue forecast is $78.5M, representing a 12% increase YoY.\n\nFactors considered:\n- Seasonal demand patterns\n- New product launches\n- Market expansion\n- Historical growth rates', 'bot', '2025-12-20 14:20:18');
