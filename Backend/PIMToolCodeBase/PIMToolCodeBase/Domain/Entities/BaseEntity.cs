using System.ComponentModel.DataAnnotations;

namespace PIMToolCodeBase.Domain.Entities
{
    /// <summary>
    ///     Base entity of all entities
    /// </summary>
    public abstract class BaseEntity
    {
        /// <summary>
        ///     Identifier of entity
        /// </summary>
        public int Id { get; set; }

        [Timestamp]
        public byte[] Version { get; set; }
    }
}