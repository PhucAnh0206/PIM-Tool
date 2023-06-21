using PIMToolCodeBase.Domain.Entities;
using PIMToolCodeBase.Domain.Objects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIMToolCodeBase.Services
{
    public interface IEmployeeService
    {
        IEnumerable<Employee> Get();

        IEnumerable<Employee> Get(Filter filter);

        Employee Get(int id);

        Employee Create(Employee employee);

        Employee Update(Employee employee);

        void Delete(int id);
    }
}
