using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Stock_Management_Business.DTO;
using Stock_Management_Business.Interface;
using System.Security.Claims;

namespace StockManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CompanyController : ControllerBase
    {
        private readonly ICompanyService _service;

        public CompanyController(ICompanyService service) 
        { 
            _service = service; 
        }

        [HttpPost]
        public async Task<IActionResult> AddCompany([FromBody] CreateCompanyDTO company)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                // Get the current user ID from JWT token
                var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
                if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out int userId))
                {
                    return Unauthorized("Invalid user token");
                }

                var result = await _service.AddCompany(company, userId);
                return Ok(new { id = result, message = "Company created successfully" });
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while creating the company" });
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetAllCompanies()
        {
            try
            {
                var companies = await _service.GetAllCompanies();
                return Ok(companies);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while retrieving companies" });
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCompanyById(int id)
        {
            try
            {
                var company = await _service.GetCompanyById(id);
                if (company == null)
                {
                    return NotFound(new { message = "Company not found" });
                }
                return Ok(company);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while retrieving the company" });
            }
        }

        [HttpPost("bulk-import")]
        public async Task<IActionResult> BulkImportCompanies([FromBody] List<CreateCompanyDTO> companies)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                if (companies == null || companies.Count == 0)
                {
                    return BadRequest(new { message = "No companies provided for import" });
                }

                // Get the current user ID from JWT token
                var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
                if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out int userId))
                {
                    return Unauthorized("Invalid user token");
                }

                var result = await _service.BulkImportCompanies(companies, userId);
                return Ok(result);
            }
            catch (Exception ex)
            {
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
