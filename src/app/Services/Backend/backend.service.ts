import { Injectable } from '@angular/core';
import axios from "axios";
import {Project} from "../../Data/Models/Project";
import {News} from "../../Data/Models/News";
import {User} from "../../Data/Models/User";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ProjectRequest} from "../../Data/Models/ProjectRequest";

@Injectable({
  providedIn: 'root'
})
export class BackendService {

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

  async GetNews() {
    let data = await axios.get(environment.backendurl +  `/News/GetNews`)
    let parsednews : News[] = data.data
    return parsednews
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
