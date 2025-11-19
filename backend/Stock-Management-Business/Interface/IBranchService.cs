using Stock_Management_Business.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Stock_Management_DataAccess.Entities;

namespace Stock_Management_Business.Interface
{
    public interface IBranchService
    {
        Task<long> AddBranch(CreateBranchDTO branch);
        Task<List<BranchListDTO>> GetAllBranches();
        Task<BranchDTO?> GetBranchById(int id);
        Task<bool> UpdateBranch(int id, CreateBranchDTO branch);
        Task<bool> DeleteBranch(int id, int userId);
        Task<BulkImportBranchResultDTO> BulkImportBranches(List<CreateBranchDTO> branches);
        Task<List<BranchListDTO>> GetBranchesByCountry(int countryId);
    Task<Stock_Management_DataAccess.Entities.BranchEntity?> GetHeadOfficeBranchDetails(int companyId);
    }
}