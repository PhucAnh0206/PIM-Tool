import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "../../services/api.service";

// const fieldMapping = {
//   Id: "id",
//   ProjectNumber: "projectNumber",
//   Name: "projectName",
//   Customer: "customer",
//   Status: "status",
//   StartDate: "startdate",
//   EndDate: "enddate",
//   Version: "version",
//   Group: "group",
// };

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
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this.newprojectForm = this.fb.group({
      projectNumber: ["", Validators.required],
      projectName: ["", Validators.required],
      customer: ["", Validators.required],
      group: ["", Validators.required],
      members: [""],
      status: ["", Validators.required],
      startdate: ["", Validators.required],
      enddate: [""],
    });

    this.route.params.subscribe((params) => {
      const projectId = params["id"];
      this.getProjectById(projectId);
    });
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
    this.newprojectForm.patchValue({
      projectNumber: this.editData[fieldMapping.projectNumber],
      projectName: this.editData[fieldMapping.projectName],
      customer: this.editData[fieldMapping.customer],
      group: this.editData[fieldMapping.group],
      members: this.editData[fieldMapping.members],
      status: this.editData[fieldMapping.status],
      startdate: this.editData[fieldMapping.startdate],
      enddate: this.editData[fieldMapping.enddate],
    });
  }

  updateProject() {
    if (this.newprojectForm.valid) {
      const updatedProject = {
        id: this.editData.id,
        projectNumber: this.newprojectForm.value.projectNumber,
        projectName: this.newprojectForm.value.projectName,
        customer: this.newprojectForm.value.customer,
        group: this.newprojectForm.value.group,
        members: this.newprojectForm.value.members,
        status: this.newprojectForm.value.status,
        startdate: this.newprojectForm.value.startdate,
        enddate: this.newprojectForm.value.enddate,
      };

      this.api.putProject(updatedProject, this.editData.id).subscribe(
        (res) => {
          alert("Project updated successfully");
          this.router.navigate(["/project/project-list"]);
        },
        (error) => {
          console.error("Error while updating project:", error);
          alert("Error while updating the project");
        }
      );
    }
  }

  cancel() {
    this.router.navigate(["/project/project-list"]);
  }
}
