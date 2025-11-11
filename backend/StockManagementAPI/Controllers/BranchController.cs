using Microsoft.AspNetCore.Mvc;
using Stock_Management_Business.DTO;
using Stock_Management_Business.Interface;

namespace StockManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    // [Authorize] // Commented out for testing - enable when authentication is ready
    public class BranchController : ControllerBase
    {
        private readonly IBranchService _service;

        public BranchController(IBranchService service) 
        { 
            _service = service; 
        }

        [HttpPost]
        public async Task<IActionResult> AddBranch([FromBody] CreateBranchDTO branch)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var result = await _service.AddBranch(branch);
                return Ok(new { id = result, message = "Branch created successfully" });
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while creating the branch" });
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetAllBranches()
        {
            try
            {
                var branches = await _service.GetAllBranches();
                return Ok(branches);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while retrieving branches" });
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetBranchById(int id)
        {
            try
            {
                var branch = await _service.GetBranchById(id);
                if (branch == null)
                {
                    return NotFound(new { message = "Branch not found" });
                }
                return Ok(branch);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while retrieving the branch" });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBranch(int id, [FromBody] CreateBranchDTO branch)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var result = await _service.UpdateBranch(id, branch);
                if (!result)
                {
                    return NotFound(new { message = "Branch not found" });
                }
                return Ok(new { message = "Branch updated successfully" });
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while updating the branch" });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBranch(int id, [FromQuery] int userId = 1)
        {
            try
            {
                var result = await _service.DeleteBranch(id, userId);
                if (!result)
                {
                    return NotFound(new { message = "Branch not found" });
                }
                return Ok(new { message = "Branch deleted successfully" });
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while deleting the branch" });
            }
        }

        [HttpPost("bulk-import")]
        public async Task<IActionResult> BulkImportBranches([FromBody] List<CreateBranchDTO> branches)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    var errors = ModelState.Values
                        .SelectMany(v => v.Errors)
                        .Select(e => e.ErrorMessage)
                        .ToList();
                    return BadRequest(new { message = "Validation failed", errors });
                }

                if (branches == null || branches.Count == 0)
                {
                    return BadRequest(new { message = "No branches provided for import" });
                }

                var result = await _service.BulkImportBranches(branches);
                return Ok(result);
            }
            catch (Exception ex)
            {
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
                var branches = await _service.GetBranchesByCountry(countryId);
                return Ok(branches);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while retrieving branches by country" });
            }
        }

        [HttpGet("head-offices")]
        public async Task<IActionResult> GetHeadOfficeBranches()
        {
            try
            {
                var branches = await _service.GetHeadOfficeBranches();
                return Ok(branches);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while retrieving head office branches" });
            }
        }
    }
}