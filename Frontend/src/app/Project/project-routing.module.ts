import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { CreateProjectComponent, ProjectListComponent } from "./components";

const routes: Routes = [
  { path: "project-list", component: ProjectListComponent },
  { path: "create-project", component: CreateProjectComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectRoutingModule {}
