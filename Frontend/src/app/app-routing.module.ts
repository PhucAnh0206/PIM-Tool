import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "project",
    loadChildren: () =>
      import("./Project/project.module").then((m) => m.ProjectModule),
  },

  { path: "", redirectTo: "/project/project-list", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
