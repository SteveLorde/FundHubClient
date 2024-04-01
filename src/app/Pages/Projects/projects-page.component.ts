import {Component, OnInit} from '@angular/core';
import {Project} from "../../Data/Models/Project";
import {BackendService} from "../../Services/Backend/backend.service";
import {CurrencyPipe, NgForOf, NgSwitch, NgSwitchCase} from "@angular/common";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {environment} from "../../../environments/environment";
import {ProjectsViewCategoryFilterPipe} from "../../Utilities/Pipes/projects-view-category-filter.pipe";

@Component({
  selector: 'app-projects-page',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink,
    RouterLinkActive,
    CurrencyPipe,
    NgSwitch,
    NgSwitchCase,
    ProjectsViewCategoryFilterPipe
  ],
  templateUrl: './projects-page.component.html',
  styleUrl: './projects-page.component.scss'
})
export class ProjectsPageComponent implements OnInit{

  public projects : Project[] = []
  selectedcategoryid : string = ""

  constructor(private backend : BackendService, private router : Router) {

  }

  ngOnInit() {
    this.GetProjects()
  }

  GetProjects() {
    this.backend.GetProjects().subscribe( (res : Project[]) => this.projects = res)
  }

  ViewProject(projectid : string) {
    this.router.navigate(['/viewproject', projectid])
  }

  FilterProjects(categoryid : string) {
    this.selectedcategoryid = categoryid
  }

  protected readonly environment = environment;
}
