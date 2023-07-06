import { ApiService } from "./../../services/api.service";
import {
  Component,
  ChangeDetectionStrategy,
  Inject,
  OnInit,
} from "@angular/core";
import {
  FormBuilder,
  Validators,
  FormControl,
  FormGroup,
  FormArray,
} from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "new-project",
  templateUrl: "./Newproject.component.html",
  styleUrls: ["./Newproject.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewprojectComponent implements OnInit {
  newprojectForm!: FormGroup;
  actionBtn: string = "Create";
  originalFormState: any;
  title: string = "New Project";
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<NewprojectComponent>,
    private router: Router,
    public translate: TranslateService
  ) {
    translate.addLangs(["en", "fr"]);
    translate.setDefaultLang("en");
  }

  switchLang(lang: string) {
    this.translate.use(lang);
  }

  // endDateValidator(control: FormControl): { [key: string]: boolean } | null {
  //   const startDate = this.newprojectForm.get('startDate')?.value;
  //   const endDate = control.value;

  //   if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
  //     return { endDateInvalid: true };
  //   }

  //   return null;
  // }

  ngOnInit() {
    this.newprojectForm = this.fb.group(
      {
        projectNumber: ["", Validators.required],
        projectName: ["", Validators.required],
        customer: ["", Validators.required],
        group: ["", Validators.required],
        members: [[]],
        status: ["New", Validators.required],
        startdate: ["", Validators.required],
        enddate: [""],
      },
      { validator: this.dateComparisonValidator }
    );

    this.originalFormState = this.newprojectForm.value;
    if (Object.keys(this.editData).length > 0) {
      this.actionBtn = "Update";
      this.title = "Edit Project";
      this.newprojectForm.controls["projectNumber"].setValue(
        this.editData.projectNumber
      );
      // this.newprojectForm.controls["projectNumber"].disable();
      this.newprojectForm.controls["projectName"].setValue(
        this.editData.projectName
      );
      this.newprojectForm.controls["customer"].setValue(this.editData.customer);
      this.newprojectForm.controls["group"].setValue(this.editData.group);
      this.newprojectForm.controls["members"].setValue(this.editData.members);
      this.newprojectForm.controls["status"].setValue(this.editData.status);
      this.newprojectForm.controls["startdate"].setValue(
        this.editData.startdate
      );
      this.newprojectForm.controls["enddate"].setValue(this.editData.enddate);
      this.originalFormState = this.newprojectForm.value;
    }
  }

  dateComparisonValidator(group: FormGroup) {
    const startDate = group.get("startdate").value;
    const endDate = group.get("enddate").value;

    if (startDate && endDate && startDate > endDate) {
      group.get("enddate").setErrors({ dateComparison: true });
    } else {
      group.get("enddate").setErrors(null);
    }
  }

  onSubmit() {
    if (Object.keys(this.editData).length === 0) {
      if (this.newprojectForm.valid) {
        this.api.postProject(this.newprojectForm.value).subscribe({
          next: (res) => {
            alert("Project added successfully");
            this.newprojectForm.reset();
            // this.dialogRef.close("create");
            this.router.navigate(["/project/project-list"]);
          },
          error: () => {
            alert("Error while adding the project ");
          },
        });
      }
    } else {
      this.updateProject();
    }
  }

  updateProject() {
    this.api.putProject(this.newprojectForm.value, this.editData.id).subscribe({
      next: (res) => {
        alert("Project updated successfully");
        this.newprojectForm.reset();
        this.dialogRef.close("update");
      },
      error: () => {
        alert("Error while updating the record");
      },
    });
  }

  cancle() {
    this.newprojectForm.reset(this.originalFormState);
  }
}
