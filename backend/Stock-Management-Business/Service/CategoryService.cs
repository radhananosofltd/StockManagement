using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Stock_Management_Business.DTO;
using Stock_Management_Business.Interface;
using Stock_Management_DataAccess.Entities;
using Stock_Management_DataAccess;

namespace Stock_Management_Business.Service
{
    public class CategoryService : ICategoryService
    {
        private readonly ILogger<CategoryService> _logger;
        private readonly Stock_Management_DataAccess.Interfaces.ICategoryRepository _categoryRepository;

        public CategoryService(Stock_Management_DataAccess.Interfaces.ICategoryRepository categoryRepository, ILogger<CategoryService> logger)
        {
            _categoryRepository = categoryRepository;
            _logger = logger;
        }

        public async Task<int> SaveCategoryAsync(SaveCategoryRequestDTO request)
        {
            try
            {
                _logger.LogInformation("Saving category: {CategoryName}", request.CategoryName);

                // Check if category already exists
                var existingCategory = await _categoryRepository.GetCategoryByNameAsync(request.CategoryName);
                if (existingCategory != null)
                {
                    _logger.LogWarning("Category '{CategoryName}' already exists.", request.CategoryName);
                    throw new InvalidOperationException($"Category '{request.CategoryName}' already exists.");
                }

                var category = new CategoryMasterEntity
                {
                    CategoryName = request.CategoryName,
                    IsActive = request.IsActive,
                    Comment = null,
                    created_by = request.UserId,
                    modified_by = request.UserId,
                    create_date = DateTime.SpecifyKind(DateTime.UtcNow, DateTimeKind.Utc),
                    modified_date = DateTime.SpecifyKind(DateTime.UtcNow, DateTimeKind.Utc)
            };
                var specifications = request.Specifications.Select(spec => new CategorySpecificationsEntity
                {
                    SpecificationId = spec.SpecificationId,
                    SkuOrder = spec.SkuOrder
                }).ToList();

                var savedCategory = await _categoryRepository.AddCategoryAsync(category);
                foreach (var spec in specifications)
                {
                    spec.CategoryId = savedCategory.CategoryId;
                }
                await _categoryRepository.AddCategorySpecificationsAsync(specifications);
                _logger.LogInformation("Category and specifications saved with CategoryId: {CategoryId}", savedCategory.CategoryId);
                return savedCategory.CategoryId;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error saving category and specifications");
                throw;
            }
        }

        public async Task<List<CategoryListDTO>> GetAllCategoriesAsync()
        {
            var entities = await _categoryRepository.GetAllCategoriesWithSpecificationsAsync();
            var dtos = entities.Select(e => new CategoryListDTO
            {
                Category = e.Category,
                Status = e.Status,
                CreatedDate = e.CreatedDate,
                Specifications = e.Specifications
            }).ToList();
            return dtos;
        }
    }
}
