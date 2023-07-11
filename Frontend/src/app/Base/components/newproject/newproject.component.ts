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

const fieldMapping = {
  id: "Id",
  projectNumber: "ProjectNumber",
  projectName: "Name",
  customer: "Customer",
  status: "Status",
  startdate: "StartDate",
  enddate: "EndDate",
  version: "Version",
  group: "GroupId",
  members: "Members",
};

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

  ngOnInit() {
    this.newprojectForm = this.fb.group(
      {
        projectNumber: ["", Validators.required],
        projectName: ["", Validators.required],
        customer: ["", Validators.required],
        group: ["", Validators.required],
        members: [""],
        status: ["New", Validators.required],
        startdate: ["", Validators.required],
        enddate: [""],
      },
      { validator: this.dateComparisonValidator }
    );

    this.originalFormState = this.newprojectForm.value;
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
        const mappedData = {};
        for (const key in this.newprojectForm.value) {
          if (fieldMapping[key]) {
            mappedData[fieldMapping[key]] = this.newprojectForm.value[key];
          }
        }
        this.api.postProject(mappedData).subscribe({
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

  cancel() {
    this.newprojectForm.reset(this.originalFormState);
  }
}
