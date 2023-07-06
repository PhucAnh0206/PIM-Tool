import { CommonModule } from "@angular/common";
import { NgModule, ModuleWithProviders } from "@angular/core";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";

import { GridComponent } from "./components";
import { NewprojectComponent } from "./components/newproject/newproject.component";
import { ReactiveFormsModule } from "@angular/forms";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { HttpClientModule } from "@angular/common/http";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatTableModule } from "@angular/material/table";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatCheckboxModule } from "@angular/material/checkbox";

// All exported items hear need to declare in public_api.ts
const DECLARED_EXPORTS = [GridComponent, NewprojectComponent];

const ENTRY_COMPONENTS = [];

const RELAYED_EXPORTS = [CommonModule, TranslateModule];

@NgModule({
  declarations: [...DECLARED_EXPORTS, NewprojectComponent, GridComponent],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
  ],
  imports: [
    RouterModule,
    ...RELAYED_EXPORTS,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    HttpClientModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatCheckboxModule,
  ],
  exports: [...RELAYED_EXPORTS, ...DECLARED_EXPORTS],
})
export class PIMBaseModule {
  static forRoot(): ModuleWithProviders<PIMBaseModule> {
    return {
      ngModule: PIMBaseModule,
    };
  }
}
