using PIMToolCodeBase.Database;
using PIMToolCodeBase.Domain.Entities;

namespace PIMToolCodeBase.Repositories.Imp
{
    public class EmployeeRepository : BaseRepository<Employee>, IEmployeeRepository
    {
        public EmployeeRepository(PimContext context) : base(context)
        {
        }
    }
}
