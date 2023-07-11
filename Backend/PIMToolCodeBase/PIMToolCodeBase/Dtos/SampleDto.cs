using System;
using System.ComponentModel.DataAnnotations;

namespace PIMToolCodeBase.Dtos
{
    /// <summary>
    ///     Dto to transfer data between client and server.
    /// </summary>
    public class SampleDto
    {
        public int Id { get; set; }

        public string Details { get; set; }


        [Timestamp]
        public byte[] Version { get; set; }
    }
}