-- Branch table creation script
-- This table stores branch information with audit fields

CREATE TABLE IF NOT EXISTS branch (
    branchid SERIAL PRIMARY KEY,
    branchcode VARCHAR(20) NOT NULL UNIQUE,
    branchname VARCHAR(200) NOT NULL,
    branchaddress VARCHAR(1000),
    branchcountryid INTEGER,
    companyid INTEGER,
    website VARCHAR(100),
    contactpersonname VARCHAR(100) NOT NULL,
    contactpersonemail VARCHAR(100) NOT NULL,
    headoffice BOOLEAN,
    headofficebranchid INTEGER,
    pan VARCHAR(20),
    taxidentificationnumbertype VARCHAR(500),
    taxidentificationnumber VARCHAR(50),
    created_by INTEGER NOT NULL,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_by INTEGER,
    modified_date TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    CONSTRAINT fk_branch_created_by FOREIGN KEY (created_by) REFERENCES users(userid) ON DELETE RESTRICT,
    CONSTRAINT fk_branch_modified_by FOREIGN KEY (modified_by) REFERENCES users(userid) ON DELETE RESTRICT,
    CONSTRAINT fk_branch_country FOREIGN KEY (branchcountryid) REFERENCES country(countryid) ON DELETE RESTRICT,
    CONSTRAINT fk_branch_company FOREIGN KEY (companyid) REFERENCES company(id) ON DELETE RESTRICT,
    CONSTRAINT fk_branch_head_office FOREIGN KEY (headofficebranchid) REFERENCES branch(branchid) ON DELETE RESTRICT
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_branch_code ON branch(branchcode);
CREATE INDEX IF NOT EXISTS idx_branch_is_active ON branch(is_active);
CREATE INDEX IF NOT EXISTS idx_branch_created_by ON branch(created_by);
CREATE INDEX IF NOT EXISTS idx_branch_modified_by ON branch(modified_by);
CREATE INDEX IF NOT EXISTS idx_branch_country_id ON branch(branchcountryid);
CREATE INDEX IF NOT EXISTS idx_branch_company_id ON branch(companyid);
CREATE INDEX IF NOT EXISTS idx_branch_head_office ON branch(headofficebranchid);
CREATE INDEX IF NOT EXISTS idx_branch_contact_email ON branch(contactpersonemail);