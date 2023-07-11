import { NgModule } from "@angular/core";

import { PIMBaseModule } from "@base";
import { ProjectListComponent } from "./components";
import { ProjectRoutingModule } from "./project-routing.module";
import { CreateProjectComponent } from "./components/create-project/create-project.component";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { EditProjectComponent } from './components/edit-project/edit-project.component';

@NgModule({
  declarations: [ProjectListComponent, CreateProjectComponent, EditProjectComponent],
  providers: [],
  imports: [
    ProjectRoutingModule,
    PIMBaseModule,
    MatToolbarModule,
    MatIconModule,
  ],
})
export class ProjectModule {}
