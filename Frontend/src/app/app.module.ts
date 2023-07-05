import { Location } from "@angular/common";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

import { AppRoutingModule } from "./app-routing.module";
import { PIMBaseModule } from "./Base/base.module";
import { ShellComponent } from "./Shell/components";
import { ShellModule } from "./Shell/shell.module";
import { ApiConfiguration } from "./swagger/api-configuration";
import { EnvironmentApiConfiguration } from "./api-config";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
export function HttpLoaderFactory(http: HttpClient, loc: Location) {
  return new TranslateHttpLoader(
    http,
    loc.prepareExternalUrl("/assets/i18n/"),
    ".json"
  );
}

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PIMBaseModule.forRoot(),
    ShellModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient, Location],
      },
      defaultLanguage: "en",
    }),
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
  ],
  exports: [TranslateModule],
  providers: [
    {
      provide: ApiConfiguration,
      useClass: EnvironmentApiConfiguration as any,
    },
  ],
  bootstrap: [ShellComponent],
})
export class AppModule {
  param = { value: "world" };

  constructor(translate: TranslateService) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang("en");

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use("en");

    translate.setTranslation("en", {
      HELLO: "hello {{value}}",
    });

    translate.get("HELLO", { value: "world" }).subscribe((res: string) => {
      console.log(res);
      //=> 'hello world'
    });
  }
}
