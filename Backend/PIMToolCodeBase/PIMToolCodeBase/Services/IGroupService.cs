using PIMToolCodeBase.Domain.Entities;
using PIMToolCodeBase.Domain.Objects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIMToolCodeBase.Services
{
    public interface IGroupService
    {
        IEnumerable<Group> Get();

        IEnumerable<Group> Get(Filter filter);

        Group Get(int id);

        Group Create(Group group);

        Group Update(Group group);

        void Delete(int id);
    }
}
