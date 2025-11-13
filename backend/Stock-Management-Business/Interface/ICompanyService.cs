using Stock_Management_Business.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Stock_Management_Business.Interface
{
    public interface ICompanyService
    {
    Task<int> AddCompany(CreateCompanyDTO company);
    Task<List<CompanyListDTO>> GetAllCompanies();
    Task<CompanyDTO?> GetCompanyById(int id);
    Task<BulkImportResultDTO> BulkImportCompanies(List<CreateCompanyDTO> companies);
    Task<bool> DeleteCompany(int id, int userId);
    Task<bool> UpdateCompany(int id, CreateCompanyDTO company);
    }
}
