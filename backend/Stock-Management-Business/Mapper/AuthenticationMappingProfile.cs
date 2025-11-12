using AutoMapper;
using Stock_Management_Business.DTO;
using Stock_Management_DataAccess.Entities;

namespace Stock_Management_Business.Mapper
{
    public class AuthenticationMappingProfile : Profile
    {
        public AuthenticationMappingProfile()
        {
            CreateMap<UserEntity, UserDTO>();
            CreateMap<UserDTO, UserEntity>();
            CreateMap<UserEntity, UserProfileDTO>();

            // Existing mappings for other DTOs/entities
           // CreateMap<AuthenticationDTO, AuthenticationEntity>().ReverseMap();
            CreateMap<BranchDTO, BranchEntity>().ReverseMap();
            CreateMap<CompanyDTO, CompanyEntity>().ReverseMap();
            CreateMap<CountryDTO, CountryEntity>().ReverseMap();

            // Add missing mapping for Specification
            CreateMap<SpecificationDTO, SpecificationEntity>().ReverseMap();
        }
    }
}