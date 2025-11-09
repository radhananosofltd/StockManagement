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
    public class BranchMappingProfile : Profile
    {
        public BranchMappingProfile()
        {
            CreateMap<BranchDTO, BranchEntity>();
            CreateMap<BranchEntity, BranchDTO>();
            
            CreateMap<CreateBranchDTO, BranchEntity>()
                .ForMember(dest => dest.BranchId, opt => opt.Ignore())
                .ForMember(dest => dest.CreatedDate, opt => opt.MapFrom(src => DateTime.UtcNow))
                .ForMember(dest => dest.CreatedBy, opt => opt.MapFrom(src => src.UserId))
                .ForMember(dest => dest.IsActive, opt => opt.MapFrom(src => src.IsActive));
                
            CreateMap<BranchEntity, BranchListDTO>();
            
            // For updates - maps CreateBranchDTO to existing BranchEntity
            CreateMap<CreateBranchDTO, BranchEntity>()
                .ForMember(dest => dest.BranchId, opt => opt.Ignore())
                .ForMember(dest => dest.CreatedDate, opt => opt.Ignore())
                .ForMember(dest => dest.CreatedBy, opt => opt.Ignore())
                .ForMember(dest => dest.ModifiedDate, opt => opt.Ignore())
                .ForMember(dest => dest.ModifiedBy, opt => opt.Ignore());
        }
    }
}