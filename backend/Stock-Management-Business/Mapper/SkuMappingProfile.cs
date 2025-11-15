using AutoMapper;
using Stock_Management_DataAccess.Entities;
using Stock_Management_Business.DTO;

namespace Stock_Management_Business.Mapper
{
    public class SkuMappingProfile : Profile
    {
        public SkuMappingProfile()
        {
            CreateMap<SkuEntity, SkuListDTO>();
        }
    }
}
