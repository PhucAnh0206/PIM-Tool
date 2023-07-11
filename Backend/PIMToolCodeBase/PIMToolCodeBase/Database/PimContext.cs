using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Common;
using System.Data.Entity;
using PIMToolCodeBase.Domain.Entities;
using PIMToolCodeBase.Extensions;

namespace PIMToolCodeBase.Database
{
    /// <summary>
    ///     DbContext of PIMTool.
    /// </summary>
    public class PimContext : DbContext
    {
        public PimContext() : base("PimDatabase")
        {
        }

        public PimContext(DbConnection dbConnection) : base(dbConnection, true)
        {
        }

        public DbSet<Sample> Samples { get; set; }

        public DbSet<Project> Projects { get; set; }

        public DbSet<Employee> Employees { get; set; }

        public DbSet<Group> Groups { get; set; }

        public DbSet<ProjectEmployee> ProjectEmployees { get; set; }



        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<BaseEntity>().HasKey(x => x.Id)
                .Property(x => x.Id).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);

            modelBuilder.Entity<Sample>().ToTablePerConcreteTable();

            modelBuilder.Entity<Project>().ToTablePerConcreteTable();

            modelBuilder.Entity<Employee>().ToTablePerConcreteTable();

            modelBuilder.Entity<Group>().ToTablePerConcreteTable();

            modelBuilder.Entity<ProjectEmployee>().ToTablePerConcreteTable();

            modelBuilder.Entity<Project>()
                .Property(p => p.Version)
                .IsConcurrencyToken();
        }
    }
}