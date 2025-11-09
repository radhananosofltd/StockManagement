using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Stock_Management_Business.DTO;
using Stock_Management_Business.Interface;
using System;

namespace StockManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CountryController : ControllerBase
    {
        private readonly ICountryService _countryService;
        private readonly ILogger<CountryController> _logger;

        public CountryController(ICountryService countryService, ILogger<CountryController> logger)
        {
            _countryService = countryService;
            _logger = logger;
        }

        /// <summary>
        /// Get all countries with their IDs and names
        /// </summary>
        /// <returns>List of countries</returns>
        [HttpGet]
        public async Task<IActionResult> GetAllCountries()
        {
            try
            {
                _logger.LogInformation("CountryController: Starting GetAllCountries endpoint");
                
                var countries = await _countryService.GetAllCountries();
                
                _logger.LogInformation($"CountryController: Successfully retrieved {countries.Count} countries");
                
                return Ok(new 
                { 
                    success = true, 
                    message = "Countries retrieved successfully", 
                    data = countries,
                    count = countries.Count
                });
            }
            catch (InvalidOperationException ex)
            {
                _logger.LogError(ex, "CountryController: Database connectivity issue: {ErrorMessage}", ex.Message);
                return StatusCode(500, new 
                { 
                    success = false, 
                    message = "Database connectivity issue",
                    error = ex.Message,
                    details = "Please check database connection and ensure the country table exists"
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "CountryController: Unexpected error occurred: {ErrorMessage}", ex.Message);
                
                // Log full exception details for debugging
                _logger.LogError("CountryController: Full exception: {Exception}", ex.ToString());
                
                return StatusCode(500, new 
                { 
                    success = false, 
                    message = "An error occurred while retrieving countries",
                    error = ex.Message,
                    innerError = ex.InnerException?.Message,
                    stackTrace = ex.StackTrace
                });
            }
        }
    }
}