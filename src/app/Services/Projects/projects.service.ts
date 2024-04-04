import { Injectable } from '@angular/core';
import {Project} from "../../Data/Models/Project";
import {environment} from "../../../environments/environment";
import axios from "axios";
import {User} from "../../Data/Models/User";
import {HttpClient} from "@angular/common/http";
import {ProjectRequest} from "../../Data/Models/ProjectRequest";

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(private http : HttpClient) { }

  GetProjects() {
    return this.http.get<Project[]>(environment.backendurl + `/Projects/GetProjects`)
  }

  GetProject(projectid : string) {
    return this.http.get<Project>(environment.backendurl + `/Projects/GetProject/${projectid}`)
  }

  async GetProjectOwnerInfo(ownerid : string) {
    let response = await axios.get(environment.backendurl +  `/Authentication/GetUser/${ownerid}`)
    let user : User = response.data
    return user
  }

  async AddProjectRequest(projecttoadd : ProjectRequest) {
    //return the newly created project id
    return await axios.post<string>(environment.backendurl + '/Projects/AddProject', projecttoadd).then(res => res.data)
  }

  async RemoveProject(projectid : string) {
    let response = await axios.post(environment.backendurl + '/Projects/RemoveProject', projectid)
    if (response.data == true) {
      return true
    }
    else {
      return false
    }
  }


}
