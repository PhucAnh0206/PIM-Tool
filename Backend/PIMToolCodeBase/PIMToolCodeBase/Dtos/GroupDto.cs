using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PIMToolCodeBase.Dtos
{
    public class GroupDto
    {
        public int Id { get; set; }

        public int GroupLeaderId { get; set; }

        [Timestamp]
        public byte[] Version { get; set; }
    }
}
