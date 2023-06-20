using System.Collections.Generic;
using PIMToolCodeBase.Domain.Entities;
using PIMToolCodeBase.Domain.Objects;

namespace PIMToolCodeBase.Services
{
    /// <summary>
    ///     Example of sample service
    /// </summary>
    public interface ISampleService
    {
        IEnumerable<Sample> Get();

        IEnumerable<Sample> Get(Filter filter);

        Sample Get(int id);

        Sample Create(Sample sample);

        Sample Update(Sample sample);

        void Delete(int id);
    }
}