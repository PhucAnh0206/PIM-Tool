using AutoMapper;
using PIMToolCodeBase.Domain.Entities;
using PIMToolCodeBase.Dtos;

namespace PIMToolCodeBase.MappingProfiles
{
    public class GroupMappingProfile : Profile
    {
        public GroupMappingProfile() : base(nameof(GroupMappingProfile))
        {
            CreateMap<Group, GroupDto>().ReverseMap();
        }
    }
}