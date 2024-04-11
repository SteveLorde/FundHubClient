import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {environment} from "../../../environments/environment";
import {NgForOf, NgSwitch, NgSwitchCase} from "@angular/common";
import {Project} from "../../Data/Models/Project";
import {ProjectsService} from "../../Services/Projects/projects.service";

@Component({
  selector: 'app-projectviewer',
  standalone: true,
  imports: [
    NgForOf,
    NgSwitchCase,
    NgSwitch
  ],
  templateUrl: './projectviewer.component.html',
  styleUrl: './projectviewer.component.scss'
})
export class ProjectviewerComponent implements OnChanges{

  @Input() projectid : string = ""

  project : Project = {} as Project

  constructor(private projectsService: ProjectsService) {
  }

  ngOnChanges(changes: SimpleChanges) {

  }



  GetProject() {
    this.projectsService.GetProject(this.projectid).subscribe(res => this.project = res)
  }

  EditProject() {

  }

  SaveProject() {

  }

  protected readonly environment = environment;




}
