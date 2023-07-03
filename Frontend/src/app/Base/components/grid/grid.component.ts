import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  ViewChild,
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

  constructor(private dialog: MatDialog, private api: ApiService) {}

  ngOnInit(): void {
    this.getAllProjects();
  }

  openDialog() {
    this.dialog
      .open(NewprojectComponent, {
        width: "30%",
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === "create") {
          this.getAllProjects();
        }
      });
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
      .subscribe((val) => {
        if (val === "update") {
          this.getAllProjects();
        }
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
