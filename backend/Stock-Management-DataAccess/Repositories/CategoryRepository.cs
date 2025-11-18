using Stock_Management_DataAccess.Entities; 
using System.Threading.Tasks;
using Stock_Management_DataAccess.Entities;
using Stock_Management_DataAccess;
using Microsoft.Extensions.Logging;
using Stock_Management_DataAccess.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Stock_Management_DataAccess.Repositories
{
    public class CategoryRepository : ICategoryRepository           
    {
        private readonly StockManagementDBContext _context;
        private readonly ILogger<CategoryRepository> _logger;
        public CategoryRepository(StockManagementDBContext context, ILogger<CategoryRepository> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<CategoryMasterEntity> AddCategoryAsync(CategoryMasterEntity category)
        {
            try
            {
                _context.CategoryMasters.Add(category);
                await _context.SaveChangesAsync();
                _logger.LogInformation("Category saved successfully. CategoryId: {CategoryId}", category.CategoryId);
                return category;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error saving category.");
                throw;
            }
        }

        public async Task AddCategorySpecificationsAsync(IEnumerable<CategorySpecificationsEntity> specifications)
        {
            try
            {
                foreach (var spec in specifications)
                {
                    _context.CategorySpecifications.Add(spec);
                }
                await _context.SaveChangesAsync();
                _logger.LogInformation("Category specifications saved successfully.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error saving category specifications.");
                throw;
            }
        }
        public async Task<CategoryMasterEntity?> GetCategoryByNameAsync(string categoryName)
        {
            try
            {
                return await _context.CategoryMasters.FirstOrDefaultAsync(c => c.CategoryName == categoryName);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error checking category existence by name.");
                throw;
            }
        }
        public async Task<List<CategoryListEntity>> GetAllCategoriesWithSpecificationsAsync()
        {
            var categories = await _context.CategoryMasters
                .Select(cat => new CategoryListEntity
                {
                    CategoryId = cat.CategoryId,
                    Category = cat.CategoryName,
                    Status = cat.IsActive ? "Active" : "Inactive",
                    CreatedDate = cat.create_date,
                    Specifications = _context.CategorySpecifications
                        .Where(cs => cs.CategoryId == cat.CategoryId)
                        .Join(_context.SpecificationEntity,
                              cs => cs.SpecificationId,
                              spec => spec.SpecificationId,
                              (cs, spec) => new SpecificationWithOrderDTO {
                                  SpecificationId = spec.SpecificationId,
                                  SpecificationName = spec.SpecificationName,
                                  SkuFieldOrder = cs.SkuOrder
                              })
                        .ToList()
                })
                .ToListAsync();
            return categories;
        }
        public async Task<CategoryMasterEntity> GetCategoryByIdAsync(int categoryId)
        {
            try
            {
                return await _context.CategoryMasters.FirstOrDefaultAsync(c => c.CategoryId == categoryId);
            }catch(Exception ex)
            {   
                string msg= ex.Message;
                return null;
            }
        }

        public async Task<bool> UpdateCategoryAsync(CategoryMasterEntity entity, List<CategorySpecificationsEntity> specifications)
        {
            var tracked = await _context.CategoryMasters.FindAsync(entity.CategoryId);
            if (tracked != null)
            {
                _context.Entry(tracked).CurrentValues.SetValues(entity);
            }
            else
            {
                _context.CategoryMasters.Update(entity);
            }
            await _context.SaveChangesAsync();

            // Update or add category specifications
            if (specifications != null)
            {
                foreach (var spec in specifications)
                {
                    var existingSpec = await _context.CategorySpecifications.FirstOrDefaultAsync(cs => cs.CategoryId == entity.CategoryId && cs.SpecificationId == spec.SpecificationId);
                    if (existingSpec != null)
                    {
                        existingSpec.SkuOrder = spec.SkuOrder;
                        _context.CategorySpecifications.Update(existingSpec);
                    }
                    else
                    {
                        _context.CategorySpecifications.Add(new CategorySpecificationsEntity
                        {
                            CategoryId = entity.CategoryId,
                            SpecificationId = spec.SpecificationId,
                            SkuOrder = spec.SkuOrder
                        });
                    }
                }
                await _context.SaveChangesAsync();
            }
            return true;
        }

    }
   
}
