import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { PIMBaseModule } from "../Base/base.module";
import { ShellComponent } from "./components/shell/shell.component";
import { AppModule } from "../app.module";
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from "@ngx-translate/core";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { HttpLoaderFactory } from "../app.module";

@NgModule({
  declarations: [ShellComponent],
  imports: [RouterModule, PIMBaseModule],
})
export class ShellModule {}
