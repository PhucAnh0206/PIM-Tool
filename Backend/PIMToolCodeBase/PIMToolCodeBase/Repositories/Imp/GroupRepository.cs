using PIMToolCodeBase.Database;
using PIMToolCodeBase.Domain.Entities;

namespace PIMToolCodeBase.Repositories.Imp
{
    public class GroupRepository : BaseRepository<Group>, IGroupRepository
    {
        public GroupRepository(PimContext context) : base(context)
        {
        }
    }
}
