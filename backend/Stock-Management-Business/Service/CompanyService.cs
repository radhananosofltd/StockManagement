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

        public async Task<int> AddCompany(CreateCompanyDTO company, int createdBy)
        {
            // Check if company code already exists
            var exists = await _repo.CompanyCodeExists(company.CustomerCode);
            if (exists)
            {
                throw new InvalidOperationException($"Company with code '{company.CustomerCode}' already exists.");
            }

            var companyEntity = _mapper.Map<CompanyEntity>(company);
            companyEntity.CreatedBy = createdBy;
            companyEntity.CreatedDate = DateTime.SpecifyKind(DateTime.UtcNow, DateTimeKind.Utc);
            companyEntity.IsActive = true;

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
    }
}
