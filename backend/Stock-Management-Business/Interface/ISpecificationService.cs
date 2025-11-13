using System.Threading.Tasks;
using Stock_Management_Business.DTO;
using System.Collections.Generic;

namespace Stock_Management_Business.Interface
{
    public interface ISpecificationService
    {
    Task<int> AddSpecificationAsync(SpecificationDTO dto);
    Task<List<SpecificationDTO>> GetAllSpecificationsAsync();
    Task<BulkImportSpecificationResultDTO> BulkImportSpecifications(List<SpecificationDTO> specifications);
    Task<bool> UpdateSpecificationAsync(int specificationid, SpecificationDTO dto);
    Task<bool> DeleteSpecificationAsync(int specificationid, int userId);
    }
}
