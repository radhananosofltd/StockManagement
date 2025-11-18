using Stock_Management_DataAccess.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Stock_Management_DataAccess.Interfaces
{
    public interface IBranchRepository
    {
        Task<long> AddBranch(BranchEntity branch);
        Task<List<BranchEntity>> GetAllBranches();
        Task<BranchEntity?> GetBranchById(int id);
        Task<bool> BranchCodeExists(string branchCode);
        Task<bool> UpdateBranch(BranchEntity branch);
        Task<bool> DeleteBranch(int id, int userId);
        Task<List<BranchEntity>> GetBranchesByCountry(int countryId);
    Task<BranchEntity?> GetHeadOfficeBranchByCompany(int companyId);
    }
}