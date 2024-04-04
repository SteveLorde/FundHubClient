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

  async GetNews() {
    let data = await axios.get(environment.backendurl +  `/News/GetNews`)
    let parsednews : News[] = data.data
    return parsednews
  }

}
