using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Stock_Management_Business.DTO;
using Stock_Management_Business.Interface;
using Microsoft.Extensions.Logging;

namespace StockManagementAPI.Controllers
{
    [ApiController]
    [Route("api/category")]
    public class CategoryController : ControllerBase            
           
    {
        private readonly ICategoryService _categoryService;
        private readonly ILogger<CategoryController> _logger;

        public CategoryController(ICategoryService categoryService, ILogger<CategoryController> logger)
        {
            _categoryService = categoryService;
            _logger = logger;
        }

 [HttpDelete("DeleteCategory")]
            public async Task<IActionResult> DeleteCategory([FromQuery] int categoryId, [FromQuery] int userId)
            {
                var result = await _categoryService.DeleteCategoryAsync(categoryId, userId);
                if (!result)
                    return NotFound(new { message = "Category not found or could not be deleted" });
                return Ok(new { message = "Category deleted successfully" });
            }
            
        [HttpPost]
        public async Task<IActionResult> SaveCategory([FromBody] SaveCategoryRequestDTO request)
        {
            _logger.LogInformation("API called to save category: {CategoryName}", request.CategoryName);
            if (string.IsNullOrWhiteSpace(request.CategoryName) || request.Specifications == null)
            {
                return BadRequest("Category name and specifications are required.");
            }
            var categoryId = await _categoryService.SaveCategoryAsync(request);
            _logger.LogInformation("Category saved successfully with ID: {CategoryId}", categoryId);
            return Ok(new { CategoryId = categoryId });
        }
        [HttpGet("GetAllCategories")]
        public async Task<IActionResult> GetAllCategories()
        {
            var categories = await _categoryService.GetAllCategoriesAsync();
            return Ok(categories);
        }

        [HttpGet("EditCategory/{categoryId}")]
            public async Task<IActionResult> EditCategory(int categoryId)
            {
                var category = await _categoryService.GetCategoryByIdAsync(categoryId);
                if (category == null)
                    return NotFound(new { message = "Category not found" });
                return Ok(category);
            }

            [HttpPut("UpdateCategory/{categoryId}")]
            public async Task<IActionResult> UpdateCategory(int categoryId, [FromBody] CategoryDTO dto)
            {
                var result = await _categoryService.UpdateCategoryAsync(categoryId, dto);
                if (!result)
                    return BadRequest(new { message = "Failed to update category" });
                return Ok(new { message = "Category updated successfully" });
            }
    }
}
