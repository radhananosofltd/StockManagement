-- Complete PostgreSQL database creation script
-- Stock Management System Database
-- Execute this script to create the complete database structure

-- Create database (run this separately as a superuser)
-- CREATE DATABASE stockmanagement;

-- Use the database
-- \c stockmanagement;

-- Users table creation script for PostgreSQL
-- This table stores user authentication and profile information

CREATE TABLE IF NOT EXISTS "Users" (
    "UserId" SERIAL PRIMARY KEY,
    "Username" VARCHAR(100) NOT NULL UNIQUE,
    "Email" VARCHAR(255) NOT NULL UNIQUE,
    "PasswordHash" TEXT NOT NULL,
    "FirstName" VARCHAR(100) NOT NULL,
    "LastName" VARCHAR(100) NOT NULL,
    "CreatedDate" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "LastLoginDate" TIMESTAMP NULL,
    "IsActive" BOOLEAN DEFAULT TRUE,
    "ResetPasswordToken" TEXT NULL,
    "ResetPasswordExpiry" TIMESTAMP NULL
);

-- Create indexes for better performance on Users table
CREATE INDEX IF NOT EXISTS idx_users_username ON "Users"("Username");
CREATE INDEX IF NOT EXISTS idx_users_email ON "Users"("Email");
CREATE INDEX IF NOT EXISTS idx_users_is_active ON "Users"("IsActive");

-- Companies table creation script for PostgreSQL
-- This table stores company information with audit fields

CREATE TABLE IF NOT EXISTS "Companies" (
    "id" SERIAL PRIMARY KEY,
    "CustomerCode" VARCHAR(50) NOT NULL UNIQUE,
    "CustomerName" VARCHAR(255) NOT NULL,
    "CustomerAddress" TEXT,
    "Currency" VARCHAR(10) DEFAULT 'USD',
    "created_by" INTEGER NOT NULL,
    "created_date" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "modified_by" INTEGER,
    "modified_date" TIMESTAMP,
    "is_active" BOOLEAN DEFAULT TRUE,
    CONSTRAINT fk_companies_created_by FOREIGN KEY ("created_by") REFERENCES "Users"("UserId") ON DELETE RESTRICT,
    CONSTRAINT fk_companies_modified_by FOREIGN KEY ("modified_by") REFERENCES "Users"("UserId") ON DELETE RESTRICT
);

-- Create indexes for better performance on Companies table
CREATE INDEX IF NOT EXISTS idx_companies_customer_code ON "Companies"("CustomerCode");
CREATE INDEX IF NOT EXISTS idx_companies_is_active ON "Companies"("is_active");
CREATE INDEX IF NOT EXISTS idx_companies_created_by ON "Companies"("created_by");
CREATE INDEX IF NOT EXISTS idx_companies_modified_by ON "Companies"("modified_by");

-- Insert sample data (optional)
-- INSERT INTO "Users" ("Username", "Email", "PasswordHash", "FirstName", "LastName") 
-- VALUES ('admin', 'admin@stockmanagement.com', 'hashedpassword', 'Admin', 'User')
-- ON CONFLICT ("Username") DO NOTHING;