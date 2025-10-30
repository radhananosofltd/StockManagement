using Stock_Management_Business.DTO;
using Stock_Management_DataAccess.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;

namespace Stock_Management_Business.Mapper
{
    public class CompanyMappingProfile:Profile
    {
        public CompanyMappingProfile() {
            CreateMap<CompanyDTO, CompanyEntity>();
        }
    }
}
