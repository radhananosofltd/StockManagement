using System.Threading.Tasks;
using System.Collections.Generic;
using Stock_Management_DataAccess.Entities;

namespace Stock_Management_DataAccess.Interfaces
{
    public interface ISpecificationRepository
    {
    Task<int> AddSpecificationAsync(SpecificationEntity entity);
    Task<bool> SpecificationNameExists(string branchCode);
    Task<List<SpecificationEntity>> GetAllSpecificationsAsync();
    Task<SpecificationEntity?> GetSpecificationByIDAsync(int specificationid);
    Task<bool> UpdateSpecificationAsync(SpecificationEntity entity);
    }
}
