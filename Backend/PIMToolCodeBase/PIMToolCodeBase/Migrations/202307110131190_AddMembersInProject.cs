namespace PIMToolCodeBase.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddMembersInProject : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Project", "Members", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Project", "Members");
        }
    }
}
