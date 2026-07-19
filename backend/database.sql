-- Create Database
CREATE DATABASE IF NOT EXISTS zentask;

USE zentask;


-- =========================
-- USERS TABLE
-- =========================

CREATE TABLE IF NOT EXISTS users (

    id BIGINT AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(100) NOT NULL,

    email VARCHAR(150) NOT NULL UNIQUE,

    password VARCHAR(255) NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP

);



-- =========================
-- INDEXES (Performance)
-- =========================

CREATE INDEX idx_tasks_user_id
ON tasks(user_id);


CREATE INDEX idx_tasks_status
ON tasks(status);


CREATE INDEX idx_tasks_priority
ON tasks(priority);


CREATE INDEX idx_tasks_due_date
ON tasks(due_date);



CREATE TABLE IF NOT EXISTS tasks (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  priority ENUM('LOW','MEDIUM','HIGH') DEFAULT 'LOW',
  status ENUM ('TODO', 'IN_PROGRESS', 'COMPLETED') DEFAULT 'TODO',
  due_date DATE NOT NULL,
  user_id BIGINT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_tasks_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE);
)