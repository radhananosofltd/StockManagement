using Stock_Management_DataAccess.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Stock_Management_DataAccess.Interfaces
{
    public interface ICompanyRepository
    {
    Task<int> AddCompany(CompanyEntity company);
    Task<List<CompanyEntity>> GetAllCompanies();
    Task<CompanyEntity?> GetCompanyById(int id);
    Task<bool> CompanyCodeExists(string companyCode);
    Task<bool> DeleteCompany(int id, int userId);
    Task<bool> UpdateCompany(CompanyEntity company);
    }
}
