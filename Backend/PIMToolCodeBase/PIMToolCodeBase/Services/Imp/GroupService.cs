using PIMToolCodeBase.Domain.Entities;
using PIMToolCodeBase.Domain.Objects;
using PIMToolCodeBase.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIMToolCodeBase.Services.Imp
{
    public class GroupService : BaseService, IGroupService
    {
        private readonly IGroupRepository _groupRepository;

        public GroupService(IGroupRepository groupRepository)
        {
            _groupRepository = groupRepository;
        }

        public IEnumerable<Group> Get()
        {
            return _groupRepository.Get();
        }

        public IEnumerable<Group> Get(Filter filter)
        {
            return _groupRepository.Get();
        }

        public Group Get(int id)
        {
            return _groupRepository.Get().SingleOrDefault(x => x.Id == id);
        }

        public Group Create(Group group)
        {
            var groups = _groupRepository.Add(group);
            _groupRepository.SaveChange();
            return groups.FirstOrDefault();
        }

        public Group Update(Group group)
        {
            var groupDb = _groupRepository.Get(group.Id);
            if (groupDb == null)
            {
                throw new ArgumentException();
            }

            groupDb.Version = group.Version;
            _groupRepository.SaveChange();
            return groupDb;
        }

        public void Delete(int id)
        {
            _groupRepository.Delete(id);
            _groupRepository.SaveChange();
        }
    }
}
