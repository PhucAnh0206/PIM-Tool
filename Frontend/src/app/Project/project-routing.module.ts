import { EditProjectComponent } from "./../Base/components/edit-project/edit-project.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { CreateProjectComponent, ProjectListComponent } from "./components";

const routes: Routes = [
  { path: "project-list", component: ProjectListComponent },
  { path: "create-project", component: CreateProjectComponent },
  { path: "edit-project/:id", component: EditProjectComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectRoutingModule {}
