using Stock_Management_DataAccess.Entities;
using Stock_Management_DataAccess.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Stock_Management_DataAccess.Repositories
{
    public class BranchRepository : IBranchRepository
    {
        private readonly StockManagementDBContext _context;

        public BranchRepository(StockManagementDBContext context)
        {
            _context = context;
        }

        public async Task<int> AddBranch(BranchEntity branch)
        {
            try
            {
                _context.BranchEntity.Add(branch);
                await _context.SaveChangesAsync();
                return branch.BranchId;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error adding branch: {ex.Message}", ex);
            }
        }

        public async Task<List<BranchEntity>> GetAllBranches()
        {
            try
            {
                return await _context.BranchEntity
                    .Where(b => b.IsActive)
                    .Include(b => b.BranchCountry)
                   // .Include(b => b.HeadOfficeBranch)
                    .OrderBy(b => b.BranchName)
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                throw new Exception($"Error retrieving branches: {ex.Message}", ex);
            }
        }

        public async Task<BranchEntity?> GetBranchById(int id)
        {
            try
            {
                return await _context.BranchEntity
                    .Include(b => b.BranchCountry)
                    //.Include(b => b.HeadOfficeBranch)
                    .FirstOrDefaultAsync(b => b.BranchId == id && b.IsActive);
            }
            catch (Exception ex)
            {
                throw new Exception($"Error retrieving branch: {ex.Message}", ex);
            }
        }

        public async Task<bool> BranchCodeExists(string branchCode)
        {
            try
            {
                return await _context.BranchEntity
                    .AnyAsync(b => b.BranchCode == branchCode && b.IsActive);
            }
            catch (Exception ex)
            {
                throw new Exception($"Error checking branch code: {ex.Message}", ex);
            }
        }

        public async Task<bool> UpdateBranch(BranchEntity branch)
        {
            try
            {
                _context.BranchEntity.Update(branch);
                var result = await _context.SaveChangesAsync();
                return result > 0;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error updating branch: {ex.Message}", ex);
            }
        }

        public async Task<bool> DeleteBranch(int id, int userId)
        {
            try
            {
                var branch = await _context.BranchEntity.FindAsync(id);
                if (branch != null)
                {
                    branch.IsActive = false;
                    branch.ModifiedBy = userId;
                    branch.ModifiedDate = DateTime.SpecifyKind(DateTime.UtcNow, DateTimeKind.Utc);
                    var result = await _context.SaveChangesAsync();
                    return result > 0;
                }
                return false;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error deleting branch: {ex.Message}", ex);
            }
        }

        public async Task<List<BranchEntity>> GetBranchesByCountry(int countryId)
        {
            try
            {
                return await _context.BranchEntity
                    .Where(b => b.BranchCountryId == countryId && b.IsActive)
                    .Include(b => b.BranchCountry)
                    .OrderBy(b => b.BranchName)
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                throw new Exception($"Error retrieving branches by country: {ex.Message}", ex);
            }
        }

        public async Task<List<BranchEntity>> GetHeadOfficeBranches()
        {
            try
            {
                return await _context.BranchEntity
                    .Where(b => b.HeadOffice && b.IsActive)
                    .OrderBy(b => b.BranchName)
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                throw new Exception($"Error retrieving head office branches: {ex.Message}", ex);
            }
        }
    }
}