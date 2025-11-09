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
    }
}
