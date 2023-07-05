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
@Component({
  selector: "pim-grid",
  templateUrl: "./grid.component.html",
  styleUrls: ["./grid.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridComponent implements OnInit {
  displayedColumns: string[] = [
    "projectNumber",
    "projectName",
    "status",
    "customer",
    "startdate",
    "action",
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild("input1") input1!: ElementRef<HTMLInputElement>;
  @ViewChild("input2") input2!: ElementRef<HTMLInputElement>;

  constructor(private dialog: MatDialog, private api: ApiService) {}

  ngOnInit(): void {
    this.getAllProjects();
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
    this.api.deleteProject(id).subscribe({
      next: (res) => {
        alert("Project deleted successfully");
        this.getAllProjects();
      },
      error: () => {
        alert("Error while deleting project");
      },
    });
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
