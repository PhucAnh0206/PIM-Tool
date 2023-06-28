import { NgModule } from "@angular/core";

import { PIMBaseModule } from "@base";
import { ProjectListComponent } from "./components";
import { ProjectRoutingModule } from "./project-routing.module";
import { CreateProjectComponent } from './components/create-project/create-project.component';

@NgModule({
  declarations: [ProjectListComponent, CreateProjectComponent],
  providers: [],
  imports: [ProjectRoutingModule, PIMBaseModule],
})
export class ProjectModule {}
