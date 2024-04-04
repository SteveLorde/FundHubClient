import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http : HttpClient) { }

  VerifyProject(projectid : string, decision : boolean) {
    return this.http.post<boolean>(environment.backendurl + "Projects/VerifyProject", {projectid: projectid, decision: decision})
  }

  DeleteProject(projectid : string) {
    return this.http.post<boolean>(environment.backendurl + "Projects/DeleteProject", projectid)
  }

}
