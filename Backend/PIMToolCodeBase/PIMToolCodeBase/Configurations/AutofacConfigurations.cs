using System;
using Autofac;
using Autofac.Integration.WebApi;
using AutoMapper;
using PIMToolCodeBase.Database;
using PIMToolCodeBase.Repositories;
using PIMToolCodeBase.Repositories.Imp;
using PIMToolCodeBase.Services;
using PIMToolCodeBase.Services.Imp;

namespace PIMToolCodeBase.Configurations
{
    public static class AutofacConfigurations
    {
        public static IContainer Register(Action<ContainerBuilder> extendRegister = null)
        {
            var builder = new ContainerBuilder();

            // for all controller in app
            builder.RegisterApiControllers(typeof(Program).Assembly);

            // Services register
            builder.RegisterType<SampleService>().As<ISampleService>().InstancePerLifetimeScope();

            // Repositories register
            builder.RegisterType<SampleRepository>().As<ISampleRepository>().InstancePerLifetimeScope();

            // Context
            builder.RegisterType<PimContext>().AsSelf().InstancePerLifetimeScope();

            // mapper
            builder.RegisterInstance(MapperFactory.GetMapper()).As<IMapper>().SingleInstance();

            // extend register
            extendRegister?.Invoke(builder);

            return builder.Build();
        }
    }
}