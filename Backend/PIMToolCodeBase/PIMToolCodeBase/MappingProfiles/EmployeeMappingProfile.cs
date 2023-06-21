using AutoMapper;
using PIMToolCodeBase.Domain.Entities;
using PIMToolCodeBase.Dtos;

namespace PIMToolCodeBase.MappingProfiles
{
    public class EmployeeMappingProfile : Profile
    {
        public EmployeeMappingProfile() : base(nameof(EmployeeMappingProfile))
        {
            CreateMap<Employee, EmployeeDto>().ReverseMap();
        }
    }
}