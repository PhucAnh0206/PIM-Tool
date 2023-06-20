using System.Collections.Generic;
using System.Web.Http;
using AutoMapper;
using PIMToolCodeBase.Domain.Entities;
using PIMToolCodeBase.Dtos;
using PIMToolCodeBase.Services;

namespace PIMToolCodeBase.Controllers
{
    /// <summary>
    ///     The example controller.
    /// </summary>
    public class SampleController : BaseController
    {
        private readonly IMapper _mapper;
        private readonly ISampleService _sampleService;

        public SampleController(ISampleService sampleService, IMapper mapper)
        {
            _sampleService = sampleService;
            _mapper = mapper;
        }

        /// <summary>
        ///     URL: /api/sample
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IEnumerable<SampleDto> Get()
        {
            return _mapper.Map<IEnumerable<Sample>, IEnumerable<SampleDto>>(_sampleService.Get());
        }

        /// <summary>
        ///     URL: /api/sample/1
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public SampleDto Get(int id)
        {
            return _mapper.Map<Sample, SampleDto>(_sampleService.Get(id));
        }

        /// <summary>
        ///     URL: /api/sample
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public SampleDto Post(SampleDto sample)
        {
            return _mapper.Map<Sample, SampleDto>(_sampleService.Create(_mapper.Map<SampleDto, Sample>(sample)));
        }

        /// <summary>
        ///     URL: /api/sample
        /// </summary>
        /// <returns></returns>
        [HttpPut]
        public SampleDto Put(SampleDto sample)
        {
            return _mapper.Map<Sample, SampleDto>(_sampleService.Update(_mapper.Map<SampleDto, Sample>(sample)));
        }

        /// <summary>
        ///     URL: /api/sample/1
        /// </summary>
        /// <returns></returns>
        [HttpDelete]
        public void Delete(int id)
        {
            _sampleService.Delete(id);
        }
    }
}