namespace PIMToolCodeBase.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ChangeEntities : DbMigration
    {
        public override void Up()
        {
            CreateIndex("dbo.Group", "GroupLeaderId");
            CreateIndex("dbo.ProjectEmployee", "ProjectId");
            CreateIndex("dbo.ProjectEmployee", "EmployeeId");
            AddForeignKey("dbo.Group", "GroupLeaderId", "dbo.Employee", "Id");
            AddForeignKey("dbo.ProjectEmployee", "ProjectId", "dbo.Project", "Id");
            AddForeignKey("dbo.ProjectEmployee", "EmployeeId", "dbo.Employee", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.ProjectEmployee", "EmployeeId", "dbo.Employee");
            DropForeignKey("dbo.ProjectEmployee", "ProjectId", "dbo.Project");
            DropForeignKey("dbo.Group", "GroupLeaderId", "dbo.Employee");
            DropIndex("dbo.ProjectEmployee", new[] { "EmployeeId" });
            DropIndex("dbo.ProjectEmployee", new[] { "ProjectId" });
            DropIndex("dbo.Group", new[] { "GroupLeaderId" });
        }
    }
}
