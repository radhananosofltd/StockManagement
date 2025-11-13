using Microsoft.AspNetCore.Mvc;
using Stock_Management_Business.DTO;
using Stock_Management_Business.Interface;
using Microsoft.Extensions.Logging;

namespace StockManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    // [Authorize] // Commented out for testing - enable when authentication is ready
    public class BranchController : ControllerBase
    {
        private readonly IBranchService _service;
        private readonly ILogger<BranchController> _logger;

        public BranchController(IBranchService service, ILogger<BranchController> logger) 
        { 
            _service = service;
            _logger = logger;
        }

        [HttpPost]
        public async Task<IActionResult> AddBranch([FromBody] CreateBranchDTO branch)
        {
            try
            {
                _logger.LogInformation("BranchController: Starting Save branch endpoint");

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var result = await _service.AddBranch(branch);
                _logger.LogInformation("Branch created successfully");
                return Ok(new { id = result, message = "Branch created successfully" });
            }
            catch (InvalidOperationException ex)
            {
                _logger.LogInformation("Branch creation failed "+ ex.Message);
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                _logger.LogInformation("An error occurred while creating the branch " + ex.Message);
                return StatusCode(500, new { message = "An error occurred while creating the branch" });
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetAllBranches()
        {
            try
            {
                _logger.LogInformation("BranchController: Get All Branches");
                var branches = await _service.GetAllBranches();
                return Ok(branches);
            }
            catch (Exception ex)
            {
                _logger.LogInformation("An error occurred while retrieving branches" + ex.Message);
                return StatusCode(500, new { message = "An error occurred while retrieving branches" });
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetBranchById(int id)
        {
            try
            {
                _logger.LogInformation("BranchController: Get Branche with Branch ID: " + id.ToString());
                var branch = await _service.GetBranchById(id);
                if (branch == null)
                {
                    _logger.LogInformation("Branch not found");
                    return NotFound(new { message = "Branch not found" });
                }
                return Ok(branch);
            }
            catch (Exception ex)
            {
                _logger.LogInformation("An error occurred while retrieving branches" + ex.Message);
                return StatusCode(500, new { message = "An error occurred while retrieving the branch" });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBranch(int id, [FromBody] CreateBranchDTO branch)
        {
            try
            {
                _logger.LogInformation("BranchController: Update Branche with Branch ID: " + id.ToString());
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var result = await _service.UpdateBranch(id, branch);
                if (!result)
                {
                    _logger.LogInformation("Branch not found to update " + id.ToString());
                    return NotFound(new { message = "Branch not found" });
                }
                _logger.LogInformation("Branch update successfully " + id.ToString());
                return Ok(new { message = "Branch updated successfully" });
            }
            catch (InvalidOperationException ex)
            {
                _logger.LogInformation("Bad Request" + ex.Message);
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                _logger.LogInformation("An error occurred while retrieving branches" + ex.Message);
                return StatusCode(500, new { message = "An error occurred while updating the branch" });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBranch(int id, [FromQuery] int userId = 1)
        {
            try
            {
                _logger.LogInformation("BranchController: Delete Branche with Branch ID: " + id.ToString());
                var result = await _service.DeleteBranch(id, userId);
                if (!result)
                {
                    _logger.LogInformation("Branch not found to update " + id.ToString());
                    return NotFound(new { message = "Branch not found" });
                }
                _logger.LogInformation("Branch deleted successfully " + id.ToString());
                return Ok(new { message = "Branch deleted successfully" });
            }
            catch (InvalidOperationException ex)
            {
                _logger.LogInformation("Bad Request" + ex.Message);
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                _logger.LogInformation("An error occurred while retrieving branches" + ex.Message);
                return StatusCode(500, new { message = "An error occurred while deleting the branch" });
            }
        }

        [HttpPost("bulk-import")]
        public async Task<IActionResult> BulkImportBranches([FromBody] List<CreateBranchDTO> branches)
        {
            try
            {
                _logger.LogInformation("BranchController: Bulk Import Branches");
                if (!ModelState.IsValid)
                {
                    var errors = ModelState.Values
                        .SelectMany(v => v.Errors)
                        .Select(e => e.ErrorMessage)
                        .ToList();
                    _logger.LogInformation("Validation failed");
                    return BadRequest(new { message = "Validation failed", errors });
                }

                if (branches == null || branches.Count == 0)
                {
                    _logger.LogInformation("No branches provided for import");
                    return BadRequest(new { message = "No branches provided for import" });
                }
               
                var result = await _service.BulkImportBranches(branches);
                _logger.LogInformation("Imported branches added successfully");
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogInformation("An error occurred during bulk import" + ex.Message);
                return StatusCode(500, new { 
                    success = false,
                    message = "An error occurred during bulk import",
                    totalRecords = branches?.Count ?? 0,
                    successfulRecords = 0,
                    failedRecords = branches?.Count ?? 0,
                    errors = new[] { ex.Message }
                });
            }
        }

        [HttpGet("by-country/{countryId}")]
        public async Task<IActionResult> GetBranchesByCountry(int countryId)
        {
            try
            {
                _logger.LogInformation("Get Branch by country");
                var branches = await _service.GetBranchesByCountry(countryId);
                return Ok(branches);
            }
            catch (Exception ex)
            {
                _logger.LogInformation("An error occurred while retrieving branches by country" + ex.Message);
                return StatusCode(500, new { message = "An error occurred while retrieving branches by country" });
            }
        }

        [HttpGet("head-offices/{companyId}")]
        public async Task<IActionResult> GetHeadOfficeBranchId(int companyId)
        {
            try
            {
                _logger.LogInformation($"Get Head Office BranchId for company {companyId}");
                var branch = await _service.GetHeadOfficeBranchDetails(companyId);
                if (branch == null)
                {
                    return NotFound(new { message = "Head office branch not found for this company" });
                }
                return Ok(new { headofficebranchid = branch.BranchId, branchname = branch.BranchName });
            }
            catch (Exception ex)
            {
                _logger.LogInformation("An error occurred while retrieving head office branch id: " + ex.Message);
                return StatusCode(500, new { message = "An error occurred while retrieving head office branch id" });
            }
        }
    }
}