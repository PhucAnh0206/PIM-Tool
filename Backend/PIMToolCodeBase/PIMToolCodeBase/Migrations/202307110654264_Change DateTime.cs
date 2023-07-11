namespace PIMToolCodeBase.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ChangeDateTime : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Project", "StartDate", c => c.DateTime(nullable: false, storeType: "date"));
            AlterColumn("dbo.Project", "EndDate", c => c.DateTime(storeType: "date"));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Project", "EndDate", c => c.DateTime());
            AlterColumn("dbo.Project", "StartDate", c => c.DateTime(nullable: false));
        }
    }
}
