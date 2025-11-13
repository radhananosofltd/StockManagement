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
    }
}
