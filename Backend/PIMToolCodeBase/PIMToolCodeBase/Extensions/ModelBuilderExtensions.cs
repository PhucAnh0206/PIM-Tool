using System.Data.Entity.ModelConfiguration;

namespace PIMToolCodeBase.Extensions
{
    public static class ModelBuilderExtensions
    {
        public static EntityTypeConfiguration<T> ToTablePerConcreteTable<T>(this EntityTypeConfiguration<T> entity)
            where T : class
        {
            return entity.Map(x =>
            {
                x.MapInheritedProperties();
                x.ToTable(typeof(T).Name);
            });
        }
    }
}