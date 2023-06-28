import { Component, ChangeDetectionStrategy, OnInit } from "@angular/core";
import {
  FormBuilder,
  Validators,
  FormControl,
  FormGroup,
} from "@angular/forms";
import { HttpClient } from "@angular/common/http";
@Component({
  selector: "new-project",
  templateUrl: "./Newproject.component.html",
  styleUrls: ["./Newproject.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewprojectComponent {
  constructor(private fb: FormBuilder, private http: HttpClient) {}

  // ngOnInit() {
  //   this.newprojectForm = new FormGroup({
  //     status: new FormControl("New"),
  //   });
  // }

  newprojectForm = this.fb.group({
    projectNumber: ["", Validators.required],
    projectName: ["", Validators.required],
    customer: ["", Validators.required],
    group: ["", Validators.required],
    members: [""],
    status: ["", Validators.required],
    startdate: ["", Validators.required],
    enddate: [""],
  });

  onSubmit(data) {
    this.http
      .post("http://localhost:8200/swagger", data)
      .subscribe((result) => console.warn("result", result));
    console.warn(data);
  }

  createProject() {
    alert("Create Project successfully");
  }

  cancle() {}
}
