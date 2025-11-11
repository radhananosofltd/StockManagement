using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Stock_Management_Business.DTO;
using Stock_Management_Business.Interface;
using System.Security.Claims;
using Microsoft.Extensions.Logging;

namespace StockManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
   // [Authorize]
    public class CompanyController : ControllerBase
    {
        private readonly ICompanyService _service;

        private readonly ILogger<CountryController> _logger;
        public CompanyController(ICompanyService service, ILogger<CountryController> logger) 
        { 
            _service = service;
            _logger = logger;
        }

        [HttpPost]
        public async Task<IActionResult> AddCompany([FromBody] CreateCompanyDTO company)
        {
            try
            {
                _logger.LogInformation("CompanyController: Starting Save Companies endpoint");
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var result = await _service.AddCompany(company);
                _logger.LogInformation("Company created successfully");
                return Ok(new { id = result, message = "Company created successfully" });
            }
            catch (InvalidOperationException ex)
            {
                _logger.LogInformation(ex.Message);
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                _logger.LogInformation(ex.Message);
                return StatusCode(500, new { message = "An error occurred while creating the company" });
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetAllCompanies()
        {
            try
            {
                _logger.LogInformation("CompanyController: Starting Get All Companies endpoint");
                var companies = await _service.GetAllCompanies();
                _logger.LogInformation("All companies fetched successfully");
                return Ok(companies);
            }
            catch (Exception ex)
            {
                _logger.LogInformation(ex.Message);
                return StatusCode(500, new { message = "An error occurred while retrieving companies" });
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCompanyById(int id)
        {
            try
            {
                _logger.LogInformation("CompanyController: Starting Get Company by ID endpoint");
                var company = await _service.GetCompanyById(id);
                if (company == null)
                {
                    _logger.LogInformation("Company not found");
                    return NotFound(new { message = "Company not found" });
                }
                _logger.LogInformation("Company fetched successfully");
                return Ok(company);
            }
            catch (Exception ex)
            {
                _logger.LogInformation(ex.Message);
                return StatusCode(500, new { message = "An error occurred while retrieving the company" });
            }
        }

        [HttpPost("bulk-import")]
        public async Task<IActionResult> BulkImportCompanies([FromBody] List<CreateCompanyDTO> companies)
        {
            try
            {
                _logger.LogInformation("CompanyController: Starting bulk company insert endpoint");
                if (!ModelState.IsValid)
                {
                    _logger.LogInformation("Invalid input");
                    return BadRequest(ModelState);
                }

                if (companies == null || companies.Count == 0)
                {
                    _logger.LogInformation("No companies provided for import");
                    return BadRequest(new { message = "No companies provided for import" });
                }
                _logger.LogInformation("Companies created successfully");
                var result = await _service.BulkImportCompanies(companies);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogInformation(ex.Message);
                return StatusCode(500, new { 
                    success = false,
                    message = "An error occurred during bulk import",
                    totalRecords = companies?.Count ?? 0,
                    successfulRecords = 0,
                    failedRecords = companies?.Count ?? 0,
                    errors = new[] { ex.Message }
                });
            }
        }
    }
}
