using PIMToolCodeBase.Domain.Entities;
using PIMToolCodeBase.Domain.Objects;
using PIMToolCodeBase.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using PIMToolCodeBase.Exceptions;

using System.Threading.Tasks;
using PIMToolCodeBase.Repositories.Imp;

namespace PIMToolCodeBase.Services.Imp
{
    public class ProjectService : BaseService, IProjectService
    {
        private readonly IProjectRepository _projectRepository;

        public ProjectService(IProjectRepository projectRepository)
        {
            _projectRepository = projectRepository;
        }

        public IEnumerable<Project> Get()
        {
            return _projectRepository.Get();
        }

        public IEnumerable<Project> Get(Filter filter)
        {
            return _projectRepository.Get();
        }

        public Project Get(int id)
        {
            return _projectRepository.Get().SingleOrDefault(x => x.Id == id);
        }

        public Project Create(Project project)
        {
            try
            {
                _projectRepository.Exists(project);
                var projects = _projectRepository.Add(project);
                _projectRepository.SaveChange();
                return projects.FirstOrDefault();

            }
            catch (ProjectNumberAlreadyExistsException e)
            {
                throw new ProjectNumberAlreadyExistsException(e.Message);
            }
        }

        public Project Update(Project project)
        {
            var projectDb = _projectRepository.Get(project.Id);
            if (projectDb == null)
            {
                throw new ArgumentException();
            }
            projectDb.ProjectNumber = project.ProjectNumber;
            projectDb.Name = project.Name;
            projectDb.Customer = project.Customer;
            projectDb.Status = project.Status;
            projectDb.StartDate = project.StartDate;
            projectDb.EndDate = project.EndDate;
            projectDb.Version = project.Version;
            projectDb.GroupId = project.GroupId;
            _projectRepository.SaveChange();
            return projectDb;
        }

        public void Delete(int id)
        {
            _projectRepository.Delete(id);
            _projectRepository.SaveChange();
        }
    }
}
