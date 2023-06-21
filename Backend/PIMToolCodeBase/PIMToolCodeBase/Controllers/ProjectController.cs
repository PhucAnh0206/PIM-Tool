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
    public class ProjectController : BaseController
    {
        private readonly IMapper _mapper;
        private readonly IProjectService _projectService;

        public ProjectController(IProjectService projectService, IMapper mapper)
        {
            _projectService = projectService;
            _mapper = mapper;
        }

        /// <summary>
        ///     URL: /api/project
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IEnumerable<ProjectDto> Get()
        {
            return _mapper.Map<IEnumerable<Project>, IEnumerable<ProjectDto>>(_projectService.Get());
        }

        /// <summary>
        ///     URL: /api/project/1
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public ProjectDto Get(int id)
        {
            return _mapper.Map<Project, ProjectDto>(_projectService.Get(id));
        }

        /// <summary>
        ///     URL: /api/project
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public ProjectDto Post(ProjectDto project)
        {
            return _mapper.Map<Project, ProjectDto>(_projectService.Create(_mapper.Map<ProjectDto, Project>(project)));
        }

        /// <summary>
        ///     URL: /api/project
        /// </summary>
        /// <returns></returns>
        [HttpPut]
        public ProjectDto Put(ProjectDto project)
        {
            return _mapper.Map<Project, ProjectDto>(_projectService.Update(_mapper.Map<ProjectDto, Project>(project)));
        }

        /// <summary>
        ///     URL: /api/project/1
        /// </summary>
        /// <returns></returns>
        [HttpDelete]
        public void Delete(int id)
        {
            _projectService.Delete(id);
        }
    }
}
