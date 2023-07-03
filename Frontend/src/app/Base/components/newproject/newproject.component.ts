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
} from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
@Component({
  selector: "new-project",
  templateUrl: "./Newproject.component.html",
  styleUrls: ["./Newproject.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewprojectComponent implements OnInit {
  newprojectForm!: FormGroup;
  actionBtn: string = "Create";
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<NewprojectComponent>
  ) {}

  ngOnInit() {
    this.newprojectForm = this.fb.group({
      projectNumber: ["", Validators.required],
      projectName: ["", Validators.required],
      customer: ["", Validators.required],
      group: ["", Validators.required],
      members: [""],
      status: ["New", Validators.required],
      startdate: ["", Validators.required],
      enddate: [""],
    });

    if (this.editData) {
      this.actionBtn = "Update";
      this.newprojectForm.controls["projectNumber"].setValue(
        this.editData.projectNumber
      );
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
    }
  }

  onSubmit(localForm) {
    if (!this.editData) {
      if (this.newprojectForm.valid) {
        this.api.postProject(this.newprojectForm.value).subscribe({
          next: (res) => {
            alert("Project added successfully");
            this.newprojectForm.reset();
            this.dialogRef.close("create");
          },
          error: () => {
            alert("Error while adding the project ");
          },
        });
      } else {
        this.updateProject();
      }
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
    const defaultValue = this.newprojectForm.get("status").value;
    this.newprojectForm.reset();
    this.newprojectForm.markAsPristine();
    this.newprojectForm.markAsUntouched();
    this.newprojectForm.get("status").setValue(defaultValue);
  }
}
