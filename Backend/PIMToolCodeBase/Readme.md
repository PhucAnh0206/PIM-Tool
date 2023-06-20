## Quick-start
#### 1. Prepare:
* Visual Studio 2019
* SQL Server at least 2012
* SQL Server Managerment 

#### 2. Stucture:
* PIMToolCodeBase: contains all source code of PIMTool.
  * **Controllers**: publish function (API) to client.
  * **Services**: handle/process main business of PIMTool.
  * **Repositories**: contact and get data from data.
  * **Database**: contains the context (session).
  * **Domain/Entities**: Entity of database.
  * **Domain/Object**: Not a DTO, not a Entity, just a object to transfer between controllers/services/repositories
  * **Dtos**: the object will send to client.
  * **MappingProfiles**: define a map of AutoMapper, using to map between different data.
  * **Configuration**: contain the config of Automapper, Autofac...

* PIMToolCodeBase.Test: test project of PIMTool code base.
  * **Service**: contains all test of Service

#### 3. How to:
1. In App.config of PIMToolCodeBase-PIMToolCodeBase.Test, re-define connectionString.
2. Run the App.

#### 4. Technical note:
1. Default Back-end port is :8200 (http://localhost:8200)
2. Project is used AutoMapper to map Object.
3. DI by Autofac.
4. Swagger has included, swagger ui could be access through http://localhost:8200/swagger/ui/index