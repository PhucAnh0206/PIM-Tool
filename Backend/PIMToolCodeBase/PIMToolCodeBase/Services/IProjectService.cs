using PIMToolCodeBase.Domain.Entities;
using PIMToolCodeBase.Domain.Objects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIMToolCodeBase.Services
{
    public interface IProjectService
    {
        IEnumerable<Project> Get();

        IEnumerable<Project> Get(Filter filter);

        Project Get(int id);

        Project Create(Project project);

        Project Update(Project project);

        void Delete(int id);
    }
}
