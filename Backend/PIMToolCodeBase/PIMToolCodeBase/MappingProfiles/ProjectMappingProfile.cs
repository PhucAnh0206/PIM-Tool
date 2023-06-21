using AutoMapper;
using PIMToolCodeBase.Domain.Entities;
using PIMToolCodeBase.Dtos;

namespace PIMToolCodeBase.MappingProfiles
{
    public class ProjectMappingProfile : Profile
    {
        public ProjectMappingProfile() : base(nameof(ProjectMappingProfile))
        {
            CreateMap<Project, ProjectDto>().ReverseMap();
        }
    }
}