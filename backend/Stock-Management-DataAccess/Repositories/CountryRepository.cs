using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Stock_Management_DataAccess.Entities;
using Stock_Management_DataAccess.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Stock_Management_DataAccess.Repositories
{
    public class CountryRepository : ICountryRepository
    {
        private readonly StockManagementDBContext _context;
        private readonly ILogger<CountryRepository> _logger;

        public CountryRepository(StockManagementDBContext context, ILogger<CountryRepository> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<List<CountryEntity>> GetAllCountries()
        {
            try
            {
                _logger.LogInformation("Attempting to retrieve all countries from database");
                
                // Log the connection string (without sensitive data)
                var connectionString = _context.Database.GetConnectionString();
                if (!string.IsNullOrEmpty(connectionString))
                {
                    _logger.LogInformation($"Database connection: {connectionString.Substring(0, Math.Min(50, connectionString.Length))}...");
                }
                else
                {
                    _logger.LogWarning("Connection string is null or empty");
                }
                
                // Test database connectivity
                var canConnect = await _context.Database.CanConnectAsync();
                _logger.LogInformation($"Database connectivity test: {canConnect}");
                
                if (!canConnect)
                {
                    _logger.LogError("Cannot connect to database");
                    throw new InvalidOperationException("Cannot connect to database");
                }
                
                // Log the SQL query that will be executed
                var query = _context.CountryEntity.AsQueryable();
                _logger.LogInformation($"Executing query on table: {typeof(CountryEntity).Name}");
                
                var countries = await query.ToListAsync();
                _logger.LogInformation($"Successfully retrieved {countries.Count} countries from database");
                
                return countries;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while retrieving countries from database: {ErrorMessage}", ex.Message);
                
                // Log specific database error details
                if (ex.InnerException != null)
                {
                    _logger.LogError("Inner exception: {InnerException}", ex.InnerException.Message);
                }
                
                throw;
            }
        }
    }
}