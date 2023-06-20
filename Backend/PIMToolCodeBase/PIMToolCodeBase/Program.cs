using System;
using System.Configuration;
using Microsoft.Owin.Hosting;

namespace PIMToolCodeBase
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var host = ConfigurationManager.AppSettings["host"];
            using (var server = WebApp.Start<Startup>(host))
            {
                Console.WriteLine($"Hosted at {host}...");
                Console.ReadLine();
            }
        }
    }
}