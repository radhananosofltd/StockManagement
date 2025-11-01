-- Company table creation script
-- This table stores company information with audit fields

CREATE TABLE Companies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    CustomerCode VARCHAR(50) NOT NULL UNIQUE,
    CustomerName VARCHAR(255) NOT NULL,
    CustomerAddress TEXT,
    Currency VARCHAR(10) DEFAULT 'USD',
    created_by INTEGER NOT NULL,
    created_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    modified_by INTEGER,
    modified_date DATETIME,
    is_active BOOLEAN DEFAULT 1,
    FOREIGN KEY (created_by) REFERENCES Users(Id),
    FOREIGN KEY (modified_by) REFERENCES Users(Id)
);

-- Create index on CustomerCode for faster lookups
CREATE INDEX idx_companies_customer_code ON Companies(CustomerCode);

-- Create index on is_active for filtered queries
CREATE INDEX idx_companies_is_active ON Companies(is_active);
