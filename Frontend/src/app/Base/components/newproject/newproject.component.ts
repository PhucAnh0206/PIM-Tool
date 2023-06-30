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
export class NewprojectComponent implements OnInit {
  newprojectForm!: FormGroup;
  constructor(private fb: FormBuilder) {
    // this.newprojectForm = new FormGroup({
    //   projectNumber: new FormControl(""),
    // });
  }

  ngOnInit() {
    this.newprojectForm = this.fb.group(
      {
        projectNumber: ["", Validators.required],
        projectName: ["", Validators.required],
        customer: ["", Validators.required],
        group: ["", Validators.required],
        members: [""],
        status: ["NEW", Validators.required],
        startdate: ["", Validators.required],
        enddate: [""],
      },
      { updateOn: "submit" }
    );
  }

  // onSubmit(data) {
  //   this.http
  //     .post("http://localhost:8200/swagger", data)
  //     .subscribe((result) => console.warn("result", result));
  //   console.warn(data);
  // }

  onSubmit(localForm) {
    if (this.newprojectForm.valid) {
      console.log(this.newprojectForm.value);
      setTimeout(() => {
        const defaultValue = this.newprojectForm.get("status").value;
        this.newprojectForm.reset();
        this.newprojectForm.markAsPristine();
        this.newprojectForm.markAsUntouched();
        this.newprojectForm.patchValue({ status: defaultValue });
      }, 0);
    }
  }

  cancle() {
    const defaultValue = this.newprojectForm.get("status").value;
    this.newprojectForm.reset();
    this.newprojectForm.markAsPristine();
    this.newprojectForm.markAsUntouched();
    this.newprojectForm.get("status").setValue(defaultValue);
  }
}
