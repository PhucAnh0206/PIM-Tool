import { CommonModule } from "@angular/common";
import { NgModule, ModuleWithProviders } from "@angular/core";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";

import { GridComponent } from "./components";
import { NewprojectComponent } from "./components/newproject/newproject.component";
import { ReactiveFormsModule } from "@angular/forms";

// All exported items hear need to declare in public_api.ts
const DECLARED_EXPORTS = [GridComponent, NewprojectComponent];

const ENTRY_COMPONENTS = [];

const RELAYED_EXPORTS = [CommonModule, TranslateModule];

@NgModule({
  declarations: [...DECLARED_EXPORTS, NewprojectComponent],
  providers: [],
  imports: [RouterModule, ...RELAYED_EXPORTS, ReactiveFormsModule],
  exports: [...RELAYED_EXPORTS, ...DECLARED_EXPORTS],
})
export class PIMBaseModule {
  static forRoot(): ModuleWithProviders<PIMBaseModule> {
    return {
      ngModule: PIMBaseModule,
    };
  }
}
