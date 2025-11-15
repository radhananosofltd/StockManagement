using System.Threading.Tasks;
using Stock_Management_Business.DTO;
using System.Collections.Generic;

namespace Stock_Management_Business.Interface
{
    public interface ICategoryService            
    {
        Task<int> SaveCategoryAsync(SaveCategoryRequestDTO request);
        Task<List<CategoryListDTO>> GetAllCategoriesAsync();
        Task<bool> DeleteCategoryAsync(int categoryId, int userId);
        Task<CategoryDTO> GetCategoryByIdAsync(int categoryId);
        Task<bool> UpdateCategoryAsync(int categoryId, CategoryDTO dto);
    }
}
