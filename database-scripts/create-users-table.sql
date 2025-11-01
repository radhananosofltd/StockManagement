CREATE TABLE Users (
    UserId INT IDENTITY(1,1) PRIMARY KEY,
    Username NVARCHAR(100) NOT NULL UNIQUE,
    Email NVARCHAR(255) NOT NULL UNIQUE,
    PasswordHash NVARCHAR(255) NOT NULL,
    FirstName NVARCHAR(100),
    LastName NVARCHAR(100),
    CreatedDate DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    LastLoginDate DATETIME2 NULL,
    IsActive BIT NOT NULL DEFAULT 1,
    ResetPasswordToken NVARCHAR(255),
    ResetPasswordExpiry DATETIME2
);

-- Additional indexes (if needed for performance)
CREATE INDEX IX_Users_LastLoginDate ON Users (LastLoginDate);
CREATE INDEX IX_Users_IsActive ON Users (IsActive);