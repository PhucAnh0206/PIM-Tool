import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "../../services/api.service";
import { MatDialog } from "@angular/material/dialog";
import { PopUpComponent } from "../pop-up/pop-up.component";
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
  selector: "edit-project",
  templateUrl: "./edit-project.component.html",
  styleUrls: ["./edit-project.component.scss"],
})
export class EditProjectComponent implements OnInit {
  editData: any; // Placeholder for the project data retrieved from the API
  newprojectForm: FormGroup;
  actionBtn: string = "Update";
  title: string = "Edit Project information";

  constructor(
    private dialogRef: MatDialog,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService,
    private dialog: MatDialog,
    private translate: TranslateService
  ) {}

  openPopup(message: string): void {
    const dialogRef = this.dialog.open(PopUpComponent, {
      width: "500px",
      data: { message: this.translate.instant(message) },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === "reload") {
        window.location.reload();
      }
    });
  }

  ngOnInit(): void {
    this.newprojectForm = this.fb.group(
      {
        projectNumber: ["", Validators.required],
        projectName: ["", Validators.required],
        customer: ["", Validators.required],
        group: ["", Validators.required],
        members: [""],
        status: ["", Validators.required],
        startdate: ["", Validators.required],
        enddate: [""],
      },
      { validator: this.dateComparisonValidator }
    );

    this.route.params.subscribe((params) => {
      const projectId = params["id"];
      this.getProjectById(projectId);
    });
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

  formatDate(date: Date | string): string {
    const formattedDate = date instanceof Date ? date : new Date(date);
    const timezoneOffset = formattedDate.getTimezoneOffset() * 60000; // Convert offset to milliseconds
    const adjustedDate = new Date(formattedDate.getTime() - timezoneOffset);
    return adjustedDate.toISOString().slice(0, 10);
  }

  getProjectById(id: number) {
    this.api.getProjectById(id).subscribe(
      (res) => {
        this.editData = res;
        this.populateForm();
      },
      (error) => {
        console.error("Error while fetching project:", error);
      }
    );
  }

  populateForm() {
    const startDate = this.formatDate(this.editData[fieldMapping.startdate]);
    const endDate = this.formatDate(this.editData[fieldMapping.enddate]);
    this.newprojectForm.patchValue({
      projectNumber: this.editData[fieldMapping.projectNumber],
      projectName: this.editData[fieldMapping.projectName],
      customer: this.editData[fieldMapping.customer],
      group: this.editData[fieldMapping.group],
      members: this.editData[fieldMapping.members],
      status: this.editData[fieldMapping.status],
      startdate: startDate,
      enddate: endDate,
    });
  }

  updateProject() {
    if (this.newprojectForm.valid && this.editData) {
      const updatedProject = {
        Id: this.editData.Id,
        ProjectNumber: this.newprojectForm.value.projectNumber,
        Name: this.newprojectForm.value.projectName,
        Customer: this.newprojectForm.value.customer,
        GroupId: this.newprojectForm.value.group,
        Members: this.newprojectForm.value.members,
        Status: this.newprojectForm.value.status,
        StartDate: this.newprojectForm.value.startdate,
        EndDate: this.newprojectForm.value.enddate,
        Version: this.editData.Version,
      };
      this.api
        .putProject(updatedProject, this.editData[fieldMapping.id])
        .subscribe(
          (res) => {
            alert("Project updated successfully");
            this.router.navigate(["/project/project-list"]);
          },
          (error) => {
            if (error.status === 409) {
              this.openPopup(
                "There was another change has been made on this project. This page will be reloaded to show the latest data"
              );
            } else {
              console.error("Error while updating project:", error);
              alert("Error while updating the project");
            }
          }
        );
    }
  }

  cancel() {
    this.router.navigate(["/project/project-list"]);
  }
}
