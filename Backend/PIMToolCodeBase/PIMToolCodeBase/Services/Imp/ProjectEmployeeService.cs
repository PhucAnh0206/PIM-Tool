using PIMToolCodeBase.Domain.Entities;
using PIMToolCodeBase.Domain.Objects;
using PIMToolCodeBase.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIMToolCodeBase.Services.Imp
{
    public class ProjectEmployeeService : BaseService, IProjectEmployeeService
    {
        private readonly IProjectEmployeeRepository _projectemployeeRepository;

        public ProjectEmployeeService(IProjectEmployeeRepository projectemployeeRepository)
        {
            _projectemployeeRepository = projectemployeeRepository;
        }

        public IEnumerable<ProjectEmployee> Get()
        {
            return _projectemployeeRepository.Get();
        }

        public IEnumerable<ProjectEmployee> Get(Filter filter)
        {
            return _projectemployeeRepository.Get();
        }

        public ProjectEmployee Get(int id)
        {
            return _projectemployeeRepository.Get().SingleOrDefault(x => x.Id == id);
        }

        public ProjectEmployee Create(ProjectEmployee projectemployee)
        {
            var projectemployees = _projectemployeeRepository.Add(projectemployee);
            _projectemployeeRepository.SaveChange();
            return projectemployees.FirstOrDefault();
        }

        public ProjectEmployee Update(ProjectEmployee projectemployee)
        {
            var projectemployeeDb = _projectemployeeRepository.Get(projectemployee.Id);
            if (projectemployeeDb == null)
            {
                throw new ArgumentException();
            }

            projectemployeeDb.Id = projectemployee.Id;
            _projectemployeeRepository.SaveChange();
            return projectemployeeDb;
        }

        public void Delete(int id)
        {
            _projectemployeeRepository.Delete(id);
            _projectemployeeRepository.SaveChange();
        }
    }
}
