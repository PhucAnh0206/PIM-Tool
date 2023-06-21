using System;
using System.ComponentModel.DataAnnotations;

namespace PIMToolCodeBase.Dtos
{
    public class EmployeeDto
    {
        public int Id { get; set; }

        [StringLength(3)]
        public string Visa { get; set; }

        [StringLength(50)]
        public string FirstName { get; set; }

        [StringLength(50)]
        public string LastName { get; set; }

        public DateTime BirthDate { get; set; }

        public int Version { get; set; }

    }
}
