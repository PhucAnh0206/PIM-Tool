using PIMToolCodeBase.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIMToolCodeBase.Dtos
{
    public class ProjectEmployeeDto
    {
        public int Id { get; set; }

        public int ProjectId { get; set; }

        public int EmployeeId { get; set; }

    }
}
