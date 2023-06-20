using System.Net.Http.Formatting;
using System.Web.Http;
using Autofac.Integration.WebApi;
using Microsoft.Owin;
using Owin;
using PIMToolCodeBase;
using PIMToolCodeBase.Configurations;
using Swashbuckle.Application;
using System.Web.Http.Cors;

[assembly: OwinStartup(typeof(Startup))]

namespace PIMToolCodeBase
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            var config = new HttpConfiguration();

            // setting the default route of api
            config.Routes.MapHttpRoute(
                "API Default",
                "api/{controller}/{id}",
                new {id = RouteParameter.Optional}
            );

            var cors = new EnableCorsAttribute("*", "*", "*", "Content-Disposition") { SupportsCredentials = true };
            config.EnableCors(cors);

            // only use json formatter
            config.Formatters.Clear();
            config.Formatters.Add(new JsonMediaTypeFormatter());

            // Register dependency
            config.DependencyResolver = new AutofacWebApiDependencyResolver(AutofacConfigurations.Register());
            config.EnableSwagger(c => { c.SingleApiVersion("v1", nameof(PIMToolCodeBase)); }).EnableSwaggerUi();
            app.UseWebApi(config);
            
        }
    }
}