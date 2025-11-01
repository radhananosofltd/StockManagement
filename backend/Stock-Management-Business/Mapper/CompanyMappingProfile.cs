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
            CreateMap<CompanyEntity, CompanyDTO>();
            CreateMap<CreateCompanyDTO, CompanyEntity>()
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.CreatedDate, opt => opt.MapFrom(src => DateTime.UtcNow))
                .ForMember(dest => dest.IsActive, opt => opt.MapFrom(src => true));
            CreateMap<CompanyEntity, CompanyListDTO>();
        }
    }
}
