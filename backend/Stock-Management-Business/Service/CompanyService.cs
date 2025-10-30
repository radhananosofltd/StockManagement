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

        public async Task<int> AddCompany(CompanyDTO company)
        {
            CompanyEntity companyEntity = _mapper.Map<CompanyEntity> (company);
            var result = await _repo.AddCompany(companyEntity);
            return result;
        }
    }
}
