using System.Threading.Tasks;
using Stock_Management_DataAccess.Entities;
using System.Collections.Generic;

namespace Stock_Management_DataAccess.Interfaces
{
    public interface ICategoryRepository
    {
        Task<CategoryMasterEntity> AddCategoryAsync(CategoryMasterEntity category);
        Task AddCategorySpecificationsAsync(IEnumerable<CategorySpecificationsEntity> categorySpecifications);
        Task<CategoryMasterEntity?> GetCategoryByNameAsync(string categoryName);
        Task<List<CategoryListEntity>> GetAllCategoriesWithSpecificationsAsync();
    }
}
