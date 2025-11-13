using Stock_Management_Business.DTO;
using Stock_Management_Business.Interface;
using Stock_Management_DataAccess.Entities;
using Stock_Management_DataAccess.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;

namespace Stock_Management_Business.Service
{
    public class CompanyService : ICompanyService        
    {
        private readonly ICompanyRepository _repo;
        private readonly IMapper _mapper;

        public CompanyService(ICompanyRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        public async Task<int> AddCompany(CreateCompanyDTO company)
        {
            // Check if company code already exists
            var exists = await _repo.CompanyCodeExists(company.CompanyCode);
            if (exists)
            {
                throw new InvalidOperationException($"Company with code '{company.CompanyCode}' already exists.");
            }

            var companyEntity = _mapper.Map<CompanyEntity>(company);
            companyEntity.CreatedBy = company.UserId;
            companyEntity.CreatedDate = DateTime.SpecifyKind(DateTime.UtcNow, DateTimeKind.Utc);
            companyEntity.ModifiedBy = company.UserId;
            companyEntity.ModifiedDate = DateTime.SpecifyKind(DateTime.UtcNow, DateTimeKind.Utc);
            companyEntity.IsActive = company.IsActive;

            var result = await _repo.AddCompany(companyEntity);
            return result;
        }

        public async Task<List<CompanyListDTO>> GetAllCompanies()
        {
            var companies = await _repo.GetAllCompanies();
            return _mapper.Map<List<CompanyListDTO>>(companies);
        }

        public async Task<CompanyDTO?> GetCompanyById(int id)
        {
            var company = await _repo.GetCompanyById(id);
            return company != null ? _mapper.Map<CompanyDTO>(company) : null;
        }

        public async Task<BulkImportResultDTO> BulkImportCompanies(List<CreateCompanyDTO> companies)
        {
            var result = new BulkImportResultDTO
            {
                TotalRecords = companies.Count,
                Errors = new List<string>()
            };

            var successCount = 0;
            var failedCount = 0;

            foreach (var company in companies)
            {
                try
                {
                    // Check if company code already exists
                    var exists = await _repo.CompanyCodeExists(company.CompanyCode);
                    if (exists)
                    {
                        result.Errors.Add($"Company with code '{company.CompanyCode}' already exists.");
                        failedCount++;
                        continue;
                    }

                    var companyEntity = _mapper.Map<CompanyEntity>(company);
                    companyEntity.CreatedBy = company.UserId;
                    companyEntity.CreatedDate = DateTime.SpecifyKind(DateTime.UtcNow, DateTimeKind.Utc);
                    companyEntity.ModifiedBy = company.UserId;
                    companyEntity.ModifiedDate = DateTime.SpecifyKind(DateTime.UtcNow, DateTimeKind.Utc);
                    companyEntity.IsActive = company.IsActive;

                    await _repo.AddCompany(companyEntity);
                    successCount++;
                }
                catch (Exception ex)
                {
                    result.Errors.Add($"Failed to import company '{company.CompanyCode}': {ex.Message}");
                    failedCount++;
                }
            }

            result.SuccessfulRecords = successCount;
            result.FailedRecords = failedCount;
            result.Success = failedCount == 0;
            result.Message = result.Success 
                ? $"Successfully imported all {successCount} companies." 
                : $"Imported {successCount} companies with {failedCount} failures.";

            return result;
        }

        public async Task<bool> DeleteCompany(int id, int userId)
        {
            var existingCompany = await _repo.GetCompanyById(id);
            if (existingCompany == null)
            {
                throw new InvalidOperationException($"Company with ID '{id}' not found.");
            }
            return await _repo.DeleteCompany(id, userId);
        }
        public async Task<bool> UpdateCompany(int id, CreateCompanyDTO company)
        {
            var existingCompany = await _repo.GetCompanyById(id);
            if (existingCompany == null)
            {
                throw new InvalidOperationException($"Company with ID '{id}' not found.");
            }
            // Check if company code already exists for a different company
            var codeExists = await _repo.CompanyCodeExists(company.CompanyCode);
            if (codeExists && existingCompany.CompanyCode != company.CompanyCode)
            {
                throw new InvalidOperationException($"Company with code '{company.CompanyCode}' already exists.");
            }
            // Update properties
            _mapper.Map(company, existingCompany);
            existingCompany.ModifiedBy = company.UserId;
            existingCompany.ModifiedDate = DateTime.SpecifyKind(DateTime.UtcNow, DateTimeKind.Utc);
            return await _repo.UpdateCompany(existingCompany);
        }
    }
}
