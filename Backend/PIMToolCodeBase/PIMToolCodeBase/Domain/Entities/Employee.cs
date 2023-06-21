using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIMToolCodeBase.Domain.Entities
{
    public class Employee : BaseEntity
    {
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
