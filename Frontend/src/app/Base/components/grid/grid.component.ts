import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from "@angular/material/dialog";
import { NewprojectComponent } from "../newproject/newproject.component";
import { ApiService } from "../../services/api.service";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatSort, MatSortModule } from "@angular/material/sort";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { TranslateService } from "@ngx-translate/core";
import { SelectionModel } from "@angular/cdk/collections";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { forkJoin } from "rxjs";

@Component({
  selector: "pim-grid",
  templateUrl: "./grid.component.html",
  styleUrls: ["./grid.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private api: ApiService,
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

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
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
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        alert("Error while fetching the Record!!");
      },
    });
  }

  editProject(row: any) {
    this.dialog
      .open(NewprojectComponent, {
        width: "30%",
        data: row,
      })
      .afterClosed()
      .subscribe({
        next: (res) => {
          this.getAllProjects();
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
        // Perform the deletion logic for selected projects
        const deletions = selectedProjectIds.map((projectId) =>
          this.api.deleteProject(projectId)
        );

        // Execute the deletion requests in parallel using forkJoin
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
  filterOptions: string[] = ["New", "Planned", "In Progess", "Finished"]; // Fixed filter options

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
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
    this.dataSource.filter = filterValue;

    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
  }

  applyStatusFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
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
    this.dataSource.filter = filterValue;
  }

  clearFilters() {
    this.input1.nativeElement.value = "";
    this.input2.nativeElement.value = "";
    // Clear the filters
    this.dataSource.filter = "";

    // Reset the filter predicate (if needed)
    this.dataSource.filterPredicate = null;

    // Optionally, you can also reset any other filter-related variables or properties in your component

    // Trigger the filter update
    this.dataSource.filter = "";
  }
}
