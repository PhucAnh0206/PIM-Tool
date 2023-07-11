using AutoMapper;
using PIMToolCodeBase.MappingProfiles;

namespace PIMToolCodeBase.Configurations
{
    public static class MapperFactory
    {
        private static readonly object s_lock = new object();
        private static IMapper _mapper;

        public static IMapper GetMapper()
        {
            if (_mapper == null)
            {
                lock (s_lock)
                {
                    if (_mapper == null)
                    {
                        var config =
                            new MapperConfiguration(
                            x =>
                            {
                                x.AddProfile(new SampleMappingProfile());
                                x.AddProfile(new ProjectMappingProfile());
                            });


                        ;
                        _mapper = config.CreateMapper();
                    }
                }
            }

            return _mapper;
        }
    }
}