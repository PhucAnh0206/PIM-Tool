using PIMToolCodeBase.Database;
using PIMToolCodeBase.Domain.Entities;

namespace PIMToolCodeBase.Repositories.Imp
{
    /// <summary>
    ///     The implementation of sample repository
    /// </summary>
    public class SampleRepository : BaseRepository<Sample>, ISampleRepository
    {
        public SampleRepository(PimContext context) : base(context)
        {
        }
    }
}