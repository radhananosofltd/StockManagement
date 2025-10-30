using Stock_Management_DataAccess.Entities;
using Stock_Management_DataAccess.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Stock_Management_DataAccess.Repositories
{
    public class CompanyRepository : ICompanyRepository
    {
        public Task<int> AddCompany(CompanyEntity company)
        {
            throw new NotImplementedException();
        }
    }
}
