using AutoMapper;
using PIMToolCodeBase.Domain.Entities;
using PIMToolCodeBase.Dtos;
using PIMToolCodeBase.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace PIMToolCodeBase.Controllers
{
    public class ProjectEmployeeController : BaseController
    {
        private readonly IMapper _mapper;
        private readonly IProjectEmployeeService _projectemployeeService;

        public ProjectEmployeeController(IProjectEmployeeService projectemployeeService, IMapper mapper)
        {
            _projectemployeeService = projectemployeeService;
            _mapper = mapper;
        }

        /// <summary>
        ///     URL: /api/projectemployee
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IEnumerable<ProjectEmployeeDto> Get()
        {
            return _mapper.Map<IEnumerable<ProjectEmployee>, IEnumerable<ProjectEmployeeDto>>(_projectemployeeService.Get());
        }

        /// <summary>
        ///     URL: /api/projectemployee/1
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public ProjectEmployeeDto Get(int id)
        {
            return _mapper.Map<ProjectEmployee, ProjectEmployeeDto>(_projectemployeeService.Get(id));
        }

        /// <summary>
        ///     URL: /api/projectemployee
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public ProjectEmployeeDto Post(ProjectEmployeeDto projectemployee)
        {
            return _mapper.Map<ProjectEmployee, ProjectEmployeeDto>(_projectemployeeService.Create(_mapper.Map<ProjectEmployeeDto, ProjectEmployee>(projectemployee)));
        }

        /// <summary>
        ///     URL: /api/projectemployee
        /// </summary>
        /// <returns></returns>
        [HttpPut]
        public ProjectEmployeeDto Put(ProjectEmployeeDto projectemployee)
        {
            return _mapper.Map<ProjectEmployee, ProjectEmployeeDto>(_projectemployeeService.Update(_mapper.Map<ProjectEmployeeDto, ProjectEmployee>(projectemployee)));
        }

        /// <summary>
        ///     URL: /api/projectemployee/1
        /// </summary>
        /// <returns></returns>
        [HttpDelete]
        public void Delete(int id)
        {
            _projectemployeeService.Delete(id);
        }
    }
}
