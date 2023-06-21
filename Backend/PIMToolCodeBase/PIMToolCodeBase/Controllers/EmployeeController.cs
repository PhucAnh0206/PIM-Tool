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
    public class EmployeeController : BaseController
    {
        private readonly IMapper _mapper;
        private readonly IEmployeeService _employeeService;

        public EmployeeController(IEmployeeService employeeService, IMapper mapper)
        {
            _employeeService = employeeService;
            _mapper = mapper;
        }

        /// <summary>
        ///     URL: /api/employee
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IEnumerable<EmployeeDto> Get()
        {
            return _mapper.Map<IEnumerable<Employee>, IEnumerable<EmployeeDto>>(_employeeService.Get());
        }

        /// <summary>
        ///     URL: /api/employee/1
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public EmployeeDto Get(int id)
        {
            return _mapper.Map<Employee, EmployeeDto>(_employeeService.Get(id));
        }

        /// <summary>
        ///     URL: /api/employee
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public EmployeeDto Post(EmployeeDto employee)
        {
            return _mapper.Map<Employee, EmployeeDto>(_employeeService.Create(_mapper.Map<EmployeeDto, Employee>(employee)));
        }

        /// <summary>
        ///     URL: /api/employee
        /// </summary>
        /// <returns></returns>
        [HttpPut]
        public EmployeeDto Put(EmployeeDto employee)
        {
            return _mapper.Map<Employee, EmployeeDto>(_employeeService.Update(_mapper.Map<EmployeeDto, Employee>(employee)));
        }

        /// <summary>
        ///     URL: /api/employee/1
        /// </summary>
        /// <returns></returns>
        [HttpDelete]
        public void Delete(int id)
        {
            _employeeService.Delete(id);
        }
    }
}
