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
      {
        validators: [
          this.dateComparisonValidator,
          this.checkProjectNumberExists.bind(this),
        ],
      }
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

  checkProjectNumberExists(group: FormGroup) {
    const projectNumber = group.get("projectNumber").value;
    this.api.getProject().subscribe({
      next: (projectList) => {
        const isExisting = projectList.some(
          (project: any) => project.ProjectNumber == projectNumber
        );
        if (isExisting) {
          this.newprojectForm.get("projectNumber")?.setErrors({ exists: true });
        } else {
          this.newprojectForm.get("projectNumber")?.setErrors(null);
        }
      },
      error: (err) => {
        alert("Error while fetching the project list");
      },
    });
  }

  onSubmit() {
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
          this.router.navigate(["/project/project-list"]);
        },
        error: (err) => {
          if (err.error) {
            alert(
              "The project number already exists. Please select a different project number."
            );
          } else {
            alert("Error while adding the project");
          }
        },
      });
    }
  }

  cancel() {
    this.newprojectForm.reset(this.originalFormState);
  }
}
