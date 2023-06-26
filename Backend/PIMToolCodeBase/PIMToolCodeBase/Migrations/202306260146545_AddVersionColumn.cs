namespace PIMToolCodeBase.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddVersionColumn : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.ProjectEmployee", "Version", c => c.Binary(nullable: false, fixedLength: true, timestamp: true, storeType: "rowversion"));
            AddColumn("dbo.Sample", "Version", c => c.Binary(nullable: false, fixedLength: true, timestamp: true, storeType: "rowversion"));
            AlterColumn("dbo.Employee", "Version", c => c.Binary(nullable: false, fixedLength: true, timestamp: true, storeType: "rowversion"));
            AlterColumn("dbo.Group", "Version", c => c.Binary(nullable: false, fixedLength: true, timestamp: true, storeType: "rowversion"));
            AlterColumn("dbo.Project", "Version", c => c.Binary(nullable: false, fixedLength: true, timestamp: true, storeType: "rowversion"));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Project", "Version", c => c.Int(nullable: false));
            AlterColumn("dbo.Group", "Version", c => c.Int(nullable: false));
            AlterColumn("dbo.Employee", "Version", c => c.Int(nullable: false));
            DropColumn("dbo.Sample", "Version");
            DropColumn("dbo.ProjectEmployee", "Version");
        }
    }
}
