using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace PIMToolCodeBase.Dtos
{
    public class GroupDto
    {
        public int Id { get; set; }

        public int GroupLeaderId { get; set; }

        public int Version { get; set; }
    }
}
