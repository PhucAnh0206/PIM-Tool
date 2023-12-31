import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  private baseUrl = "http://localhost:8200/api/Project/";
  constructor(private http: HttpClient) {}

  postProject(data: any) {
    return this.http.post<any>("http://localhost:8200/api/Project/", data);
  }
  getProject() {
    return this.http.get<any>("http://localhost:8200/api/Project/");
  }

  getProjectById(id: number) {
    return this.http.get<any>("http://localhost:8200/api/Project/" + id);
  }

  putProject(data: any, id: number) {
    return this.http.put<any>("http://localhost:8200/api/Project/" + id, data);
  }

  deleteProject(id: number) {
    return this.http.delete<any>("http://localhost:8200/api/Project/" + id);
  }
}
