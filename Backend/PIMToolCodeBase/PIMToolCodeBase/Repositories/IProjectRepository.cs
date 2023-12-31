﻿using PIMToolCodeBase.Domain.Entities;

namespace PIMToolCodeBase.Repositories
{
    public interface IProjectRepository : IRepository<Project>
    {
        void Exists(Project project);
    }
}
