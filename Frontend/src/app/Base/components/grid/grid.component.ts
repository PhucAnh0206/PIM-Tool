import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ApiService } from "../../services/api.service";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";

import { TranslateService } from "@ngx-translate/core";
import { SelectionModel } from "@angular/cdk/collections";
import { Router } from "@angular/router";
import { forkJoin } from "rxjs";

const fieldMapping = {
  Id: "id",
  ProjectNumber: "projectNumber",
  Name: "projectName",
  Customer: "customer",
  Status: "status",
  StartDate: "startdate",
  EndDate: "enddate",
  Version: "version",
  Group: "group",
  Members: "members",
};
@Component({
  selector: "pim-grid",
  templateUrl: "./grid.component.html",
  styleUrls: ["./grid.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridComponent implements OnInit, AfterViewInit {
  constructor(
    private dialog: MatDialog,
    private api: ApiService,
    private router: Router,
    public translate: TranslateService
  ) {
    translate.addLangs(["en", "fr"]);
    translate.setDefaultLang("en");
  }
  displayedColumns: string[] = [
    "select",
    "projectNumber",
    "projectName",
    "status",
    "customer",
    "startdate",
    "action",
  ];
  dataSource!: MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild("input1") input1!: ElementRef<HTMLInputElement>;
  @ViewChild("input2") input2!: ElementRef<HTMLInputElement>;

  switchLang(lang: string) {
    this.translate.use(lang);
  }

  ngOnInit(): void {
    this.getAllProjects();
  }

  ngAfterViewInit() {
    // this.dataSource.sort = this.sort;
  }

  // Whether the number of selected elements matches the total number of rows.
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource?.data?.length || 0;
    return numSelected === numRows;
  }

  // Selects all rows if they are not all selected; otherwise clear selection.
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }

  // The label for the checkbox on the passed row
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? "deselect" : "select"} all`;
    }
    return `${this.selection.isSelected(row) ? "deselect" : "select"} row ${
      row.position + 1
    }`;
  }

  getAllProjects() {
    this.api.getProject().subscribe({
      next: (res) => {
        const mappedData = res.map((item) => {
          const mappedItem = {};
          for (const key in item) {
            if (fieldMapping[key]) {
              mappedItem[fieldMapping[key]] = item[key];
            }
          }
          return mappedItem;
        });

        mappedData.sort((a, b) => a.projectNumber - b.projectNumber);

        this.dataSource = new MatTableDataSource(mappedData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        alert("Error while fetching the Record!!");
        this.router.navigate(["/pagenotfound"]);
      },
    });
  }

  deleteProduct(id: number) {
    const project = this.dataSource.data.find((item) => item.id === id);
    if (project && project.status === "New") {
      this.api.deleteProject(id).subscribe({
        next: (res) => {
          alert("Project deleted successfully");
          this.getAllProjects();
        },
        error: () => {
          alert("Error while deleting project");
        },
      });
    } else {
      alert("Only 'New' projects can be deleted");
    }
  }

  deleteSelectedProjects() {
    const selectedProjects = this.selection.selected;
    const selectedProjectIds = selectedProjects.map((project) => project.id);
    let allProjectsNew = true;

    for (const project of selectedProjects) {
      if (project.status !== "New") {
        allProjectsNew = false;
        break;
      }
    }

    if (allProjectsNew) {
      if (selectedProjects.length > 0) {
        const deletions = selectedProjectIds.map((projectId) =>
          this.api.deleteProject(projectId)
        );

        forkJoin(deletions).subscribe(
          () => {
            alert("Selected projects deleted successfully");
            this.getAllProjects();
            this.selection.clear();
          },
          () => {
            alert("Error while deleting selected projects");
          }
        );
      } else {
        alert("No projects selected");
      }
    } else {
      alert("Only 'New' projects can be deleted");
    }
  }

  filteredColumns: string[] = ["projectNumber", "projectName", "customer"];
  filteredColumn: string[] = ["status"];

  applyFilters() {
    const filterValue1 = this.input1.nativeElement.value;
    const filterValue2 = this.input2.nativeElement.value;

    // if (filterValue1 !== "" && filterValue2 !== "") {
    //   this.dataSource.filterPredicate = (data: any, filter: string) => {
    //     const transformedFilter = filter.trim().toLowerCase();
    //     const columnValue1 = data.column1
    //       ? data.column1.toString().toLowerCase()
    //       : "";
    //     const columnValue2 = data.column2
    //       ? data.column2.toString().toLowerCase()
    //       : "";

    //     return (
    //       columnValue1.includes(transformedFilter) &&
    //       columnValue2.includes(transformedFilter)
    //     );
    //   };

    //   const combinedFilter = filterValue1 + filterValue2;
    //   this.dataSource.filter = combinedFilter;
    // } else
    if (filterValue1 !== "") {
      this.dataSource.filterPredicate = (data: string, filter: string) => {
        const transformedFilter = filter.trim().toLowerCase();
        for (const column of this.filteredColumns) {
          const columnValue = data[column]
            ? data[column].toString().toLowerCase()
            : "";
          if (columnValue.includes(transformedFilter)) {
            return true;
          }
        }
        return false;
      };
      this.dataSource.filter = filterValue1;
    } else if (filterValue2 !== "") {
      this.dataSource.filterPredicate = (data: string, filter: string) => {
        const transformedFilter = filter.trim().toLowerCase();
        for (const column of this.filteredColumn) {
          const columnValue = data[column]
            ? data[column].toString().toLowerCase()
            : "";
          if (columnValue.includes(transformedFilter)) {
            return true;
          }
        }
        return false;
      };
      this.dataSource.filter = filterValue2;
    } else {
      this.dataSource.filterPredicate = null;
      this.dataSource.filter = "";
    }
  }

  clearFilters() {
    this.input1.nativeElement.value = "";
    this.input2.nativeElement.value = "";

    this.dataSource.filter = "";

    this.dataSource.filterPredicate = null;

    this.dataSource.filter = "";
  }
}
