using AutoMapper;
using PIMToolCodeBase.Domain.Entities;
using PIMToolCodeBase.Dtos;

namespace PIMToolCodeBase.MappingProfiles
{
    public class SampleMappingProfile : Profile
    {
        public SampleMappingProfile() : base(nameof(SampleMappingProfile))
        {
            CreateMap<Sample, SampleDto>().ReverseMap();
        }
    }
}