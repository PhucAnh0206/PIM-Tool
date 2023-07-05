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
  imports: [
    RouterModule,
    PIMBaseModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient, Location],
      },
      defaultLanguage: "en",
    }),
  ],
})
export class ShellModule {
  constructor(public translate: TranslateService) {
    translate.addLangs(["en", "fr"]);
    translate.setDefaultLang("en");

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr/) ? browserLang : "en");
  }
}
