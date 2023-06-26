namespace PIMToolCodeBase.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ChangeProjectEntity : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Project", "GroupId", "dbo.Group");
            DropIndex("dbo.Project", new[] { "GroupId" });
        }
        
        public override void Down()
        {
            CreateIndex("dbo.Project", "GroupId");
            AddForeignKey("dbo.Project", "GroupId", "dbo.Group", "Id");
        }
    }
}
