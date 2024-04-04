import {Component, signal} from '@angular/core';
import {FundRequestFormComponent} from "../../FundProjectForm/fund-request-form.component";
import {Project} from "../../../Data/Models/Project";
import {Donation} from "../../../Data/Models/Donation";
import {ProjectsService} from "../../../Services/Projects/projects.service";
import {AdminService} from "../../../Services/Admin/admin.service";
import Swal from "sweetalert2";
import {DonationsService} from "../../../Services/Donations/donations.service";

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [
    FundRequestFormComponent
  ],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.scss'
})
export class AdminPanelComponent {
  public projectrequestformvisible : boolean = true
  public allProjects : Project[] = []
  public allDonations : Donation[] = []
  public selectedProject = signal<Project>({} as Project)

  constructor(private projectsService : ProjectsService, private adminService : AdminService, private donationsService : DonationsService) {

  }

  ValidateProject(decision : boolean) {

  }

  GetAllProjects() {
    this.projectsService.GetProjects().subscribe(res => this.allProjects = res)
  }

  GetAllDonations() {
    this.donationsService.g
  }

  async DeleteProject(projectid: string) {
    let res = await this.projectsService.RemoveProject(projectid)
    if (res) {

    }
    else {
      Swal.fire("Deleting Project failed")
    }
  }


}
