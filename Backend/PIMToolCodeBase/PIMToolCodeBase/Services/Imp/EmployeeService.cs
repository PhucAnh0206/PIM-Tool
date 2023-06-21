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
    public class EmployeeService : BaseService, IEmployeeService
    {
        private readonly IEmployeeRepository _employeeRepository;

        public EmployeeService(IEmployeeRepository employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }

        public IEnumerable<Employee> Get()
        {
            return _employeeRepository.Get();
        }

        public IEnumerable<Employee> Get(Filter filter)
        {
            return _employeeRepository.Get();
        }

        public Employee Get(int id)
        {
            return _employeeRepository.Get().SingleOrDefault(x => x.Id == id);
        }

        public Employee Create(Employee employee)
        {
            var employees = _employeeRepository.Add(employee);
            _employeeRepository.SaveChange();
            return employees.FirstOrDefault();
        }

        public Employee Update(Employee employee)
        {
            var employeeDb = _employeeRepository.Get(employee.Id);
            if (employeeDb == null)
            {
                throw new ArgumentException();
            }

            employeeDb.FirstName = employee.LastName;
            _employeeRepository.SaveChange();
            return employeeDb;
        }

        public void Delete(int id)
        {
            _employeeRepository.Delete(id);
            _employeeRepository.SaveChange();
        }
    }
}
