using AutoMapper;
using Stock_Management_Business.DTO;
using Stock_Management_DataAccess.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Stock_Management_Business.Mapper
{
    public class AuthenticationMappingProfile : Profile
    {
        public AuthenticationMappingProfile()
        {
            CreateMap<UserEntity, UserDTO>();
            CreateMap<UserDTO, UserEntity>();
        }
    }
}