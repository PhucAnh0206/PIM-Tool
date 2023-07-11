namespace PIMToolCodeBase.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ChangeVersionType : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.ProjectEmployee", "Version", c => c.Binary(nullable: false, fixedLength: true, timestamp: true, storeType: "rowversion"));
            AddColumn("dbo.Sample", "Version", c => c.Binary(nullable: false, fixedLength: true, timestamp: true, storeType: "rowversion"));
            AddColumn("dbo.Employee", "Version", c => c.Binary(nullable: false, fixedLength: true, timestamp: true, storeType: "rowversion"));
            AddColumn("dbo.Group", "Version", c => c.Binary(nullable: false, fixedLength: true, timestamp: true, storeType: "rowversion"));
            AddColumn("dbo.Project", "Version", c => c.Binary(nullable: false, fixedLength: true, timestamp: true, storeType: "rowversion"));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Project", "Version");
            DropColumn("dbo.Group", "Version");
            DropColumn("dbo.Employee", "Version");
            DropColumn("dbo.Sample", "Version");
            DropColumn("dbo.ProjectEmployee", "Version");
        }
    }
}
