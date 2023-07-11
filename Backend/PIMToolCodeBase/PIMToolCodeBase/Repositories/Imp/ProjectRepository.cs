using PIMToolCodeBase.Database;
using PIMToolCodeBase.Domain.Entities;
using PIMToolCodeBase.Exceptions;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

namespace PIMToolCodeBase.Repositories.Imp
{
    public class ProjectRepository : BaseRepository<Project>, IProjectRepository
    {
        private readonly PimContext _pimContext;
        protected readonly DbSet<Project> Set;

        public ProjectRepository(PimContext context) : base(context)
        {
            _pimContext = context;
            Set = _pimContext.Set<Project>();
        }

        public void Exists(Project project)
        {
            if(Set.SingleOrDefault(x => x.ProjectNumber == project.ProjectNumber) != null)
            {
                throw new ProjectNumberAlreadyExistsException();
            }
        }

    }
}
