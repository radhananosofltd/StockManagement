# PostgreSQL Database Setup for Stock Management System

This document provides instructions for setting up PostgreSQL database for the Stock Management System.

## Prerequisites

1. **PostgreSQL installed and running** - Make sure PostgreSQL is installed on your system
2. **Database user credentials** - You'll need a PostgreSQL user with database creation privileges

## Database Setup Steps

### 1. Create Database

Connect to PostgreSQL as a superuser (e.g., `postgres`) and create the database:

```sql
CREATE DATABASE stockmanagement;
```

### 2. Create Database User (Optional)

If you want to create a dedicated user for the application:

```sql
CREATE USER stockmanager WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE stockmanagement TO stockmanager;
```

### 3. Run Database Scripts

Connect to the `stockmanagement` database and run the creation script:

```bash
psql -d stockmanagement -f create-complete-database.sql
```

Or run individual scripts:

```bash
psql -d stockmanagement -f create-users-table.sql
psql -d stockmanagement -f create-companies-table.sql
```

## Connection String Configuration

Update your `appsettings.json` and `appsettings.Development.json` files with the appropriate connection string:

### For local development:
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Database=stockmanagement;Username=postgres;Password=your_password"
  }
}
```

### For production:
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=your_server;Database=stockmanagement;Username=your_user;Password=your_password;SSL Mode=Require;"
  }
}
```

## Common Connection String Parameters

- **Host**: PostgreSQL server hostname (e.g., `localhost`, `127.0.0.1`)
- **Port**: PostgreSQL port (default: `5432`)
- **Database**: Database name (`stockmanagement`)
- **Username**: PostgreSQL username
- **Password**: PostgreSQL password
- **SSL Mode**: SSL connection mode (`Require`, `Prefer`, `Disable`)

## Testing Connection

After setting up the database and updating the connection string:

1. Build the backend project: `dotnet build`
2. Run the backend API: `dotnet run`
3. Check the logs to ensure Entity Framework connects successfully
4. Verify tables are created in the PostgreSQL database

## Troubleshooting

### Common Issues:

1. **Connection refused**: Ensure PostgreSQL service is running
2. **Authentication failed**: Check username/password in connection string
3. **Database does not exist**: Create the database first
4. **Permission denied**: Grant appropriate privileges to the database user

### Useful PostgreSQL Commands:

```bash
# Check PostgreSQL status
sudo systemctl status postgresql

# Start PostgreSQL service
sudo systemctl start postgresql

# Connect to PostgreSQL
psql -U postgres

# List databases
\l

# Connect to specific database
\c stockmanagement

# List tables
\dt

# Describe table structure
\d "Companies"
```