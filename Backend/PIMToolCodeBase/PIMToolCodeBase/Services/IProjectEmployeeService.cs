using PIMToolCodeBase.Domain.Entities;
using PIMToolCodeBase.Domain.Objects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIMToolCodeBase.Services
{
    public interface IProjectEmployeeService
    {
        IEnumerable<ProjectEmployee> Get();

        IEnumerable<ProjectEmployee> Get(Filter filter);

        ProjectEmployee Get(int id);

        ProjectEmployee Create(ProjectEmployee projectemployee);

        ProjectEmployee Update(ProjectEmployee projectemployee);

        void Delete(int id);
    }
}
