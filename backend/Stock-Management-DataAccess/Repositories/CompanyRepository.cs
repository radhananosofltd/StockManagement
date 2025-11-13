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
    public class CompanyRepository : ICompanyRepository 
       
    {
        private readonly StockManagementDBContext _context;

        public CompanyRepository(StockManagementDBContext context)
        {
            _context = context;
        }

        public async Task<int> AddCompany(CompanyEntity company)
        {
            try
            {
                _context.CompanyEntity.Add(company);
                await _context.SaveChangesAsync();
                return company.Id;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error adding company: {ex.Message}", ex);
            }
        }

        public async Task<List<CompanyEntity>> GetAllCompanies()
        {
            try
            {
                return await _context.CompanyEntity
                    .Include(c => c.Country)
                    .Where(c => c.IsActive)
                    .OrderBy(c => c.CompanyName)
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                throw new Exception($"Error retrieving companies: {ex.Message}", ex);
            }
        }

        public async Task<CompanyEntity?> GetCompanyById(int id)
        {
            try
            {
                return await _context.CompanyEntity
                    .FirstOrDefaultAsync(c => c.Id == id && c.IsActive);
            }
            catch (Exception ex)
            {
                throw new Exception($"Error retrieving company: {ex.Message}", ex);
            }
        }

        public async Task<bool> CompanyCodeExists(string companyCode)
        {
            try
            {
                return await _context.CompanyEntity
                    .AnyAsync(c => c.CompanyCode == companyCode && c.IsActive);
            }
            catch (Exception ex)
            {
                throw new Exception($"Error checking company code: {ex.Message}", ex);
            }
        }

        public async Task<bool> DeleteCompany(int id, int userId)
        {
            try
            {
                var company = await _context.CompanyEntity.FindAsync(id);
                if (company != null)
                {
                    company.IsActive = false;
                    company.ModifiedBy = userId;
                    company.ModifiedDate = DateTime.SpecifyKind(DateTime.UtcNow, DateTimeKind.Utc);
                    var result = await _context.SaveChangesAsync();
                    return result > 0;
                }
                return false;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error deleting company: {ex.Message}", ex);
            }
        }
        public async Task<bool> UpdateCompany(CompanyEntity company)
        {
            try
            {
                _context.CompanyEntity.Update(company);
                var result = await _context.SaveChangesAsync();
                return result > 0;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error updating company: {ex.Message}", ex);
            }
        }
    }
}
