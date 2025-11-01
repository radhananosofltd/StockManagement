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
        }
    }
}