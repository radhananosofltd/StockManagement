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

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_username ON "Users"("Username");
CREATE INDEX IF NOT EXISTS idx_users_email ON "Users"("Email");
CREATE INDEX IF NOT EXISTS idx_users_is_active ON "Users"("IsActive");