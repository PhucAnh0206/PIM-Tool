using MathNet.Numerics;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIMToolCodeBase.Domain.Entities
{
    public class Project : BaseEntity
    {
        public int ProjectNumber { get; set; }

        [StringLength(50)]
        public string Name { get; set; }

        [StringLength(50)]
        public string Customer { get; set; }

        public string Status { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime? EndDate { get; set; }
           
        public int Version { get; set; }

        public int GroupId { get; set; }  // Foreign key property
    }
}
