using System;
using System.ComponentModel.DataAnnotations;


namespace PIMToolCodeBase.Dtos
{
    public class ProjectDto
    {
        public int Id { get; set; }
        public int ProjectNumber { get; set; }

        [StringLength(50)]
        public string Name { get; set; }

        [StringLength(50)]
        public string Customer { get; set; }

        [StringLength(3)]
        public string Status { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime? EndDate { get; set; }

        public int Version { get; set; }

        public int GroupId { get; set; }  // Foreign key property
    }
}
