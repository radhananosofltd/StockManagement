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

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_companies_customer_code ON "Companies"("CustomerCode");
CREATE INDEX IF NOT EXISTS idx_companies_is_active ON "Companies"("is_active");
CREATE INDEX IF NOT EXISTS idx_companies_created_by ON "Companies"("created_by");
CREATE INDEX IF NOT EXISTS idx_companies_modified_by ON "Companies"("modified_by");