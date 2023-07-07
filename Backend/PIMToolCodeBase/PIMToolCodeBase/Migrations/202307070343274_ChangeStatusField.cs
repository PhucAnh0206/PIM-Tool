namespace PIMToolCodeBase.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ChangeStatusField : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Project", "Status", c => c.String());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Project", "Status", c => c.String(maxLength: 3));
        }
    }
}
