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

        public string Status { get; set; }
        public int GroupId { get; set; }

        public string Members { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime? EndDate { get; set; }

        [Timestamp]
        public byte[] Version { get; set; }




    }
}
