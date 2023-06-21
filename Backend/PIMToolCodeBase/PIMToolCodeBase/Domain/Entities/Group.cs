using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIMToolCodeBase.Domain.Entities
{
    public class Group : BaseEntity
    {
        [ForeignKey("Employee")]
        public int GroupLeaderId { get; set; }
        public Employee Employee { get; set; }

        public int Version { get; set; }
    }
}
