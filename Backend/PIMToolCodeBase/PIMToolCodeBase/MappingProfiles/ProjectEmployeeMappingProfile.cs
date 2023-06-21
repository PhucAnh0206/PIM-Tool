using AutoMapper;
using PIMToolCodeBase.Domain.Entities;
using PIMToolCodeBase.Dtos;

namespace PIMToolCodeBase.MappingProfiles
{
    public class ProjectEmployeeMappingProfile : Profile
    {
        public ProjectEmployeeMappingProfile() : base(nameof(ProjectEmployeeMappingProfile))
        {
            CreateMap<ProjectEmployee, ProjectEmployeeDto>().ReverseMap();
        }
    }
}