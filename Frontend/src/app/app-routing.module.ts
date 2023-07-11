import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PageNotFoundComponent } from "./Base/components/page-not-found/page-not-found.component";

const routes: Routes = [
  {
    path: "project",
    loadChildren: () =>
      import("./Project/project.module").then((m) => m.ProjectModule),
  },

  { path: "", redirectTo: "/project/project-list", pathMatch: "full" },
  { path: "**", component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
