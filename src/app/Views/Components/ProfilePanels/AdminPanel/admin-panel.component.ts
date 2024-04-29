import {Component, signal} from '@angular/core';
import {FundRequestFormComponent} from "../../FundProjectForm/fund-request-form.component";
import {Project} from "../../../../Data/Models/Project";
import {Donation} from "../../../../Data/Models/Donation";
import {ProjectsService} from "../../../../Services/Projects/projects.service";
import {AdminService} from "../../../../Services/Admin/admin.service";
import Swal from "sweetalert2";
import {DonationsService} from "../../../../Services/Donations/donations.service";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [
    FundRequestFormComponent,
    NgForOf
  ],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.scss'
})
export class AdminPanelComponent {
  public projectrequestformvisible : boolean = true
  public projects : Project[] = []
  public donations : Donation[] = []
  public totalProjectsPages : number = 0
  public totalDonationsPages : number = 0
  public selectedProject = signal<Project>({} as Project)

  constructor(private projectsService : ProjectsService, private adminService : AdminService, private donationsService : DonationsService) {

  }

  ValidateProject(decision : boolean) {

  }

  GetProjects(pagenumber : number) {
    this.projectsService.GetProjects(pagenumber).subscribe(res => {
      this.projects = res.projects
      this.totalProjectsPages = res.totalPages
    })
  }

  SelectProjectToView(projectid : string) {
    const projectToSelect = this.projects.find(p => p.id == projectid)
    this.selectedProject.set(projectToSelect);
  }

  GetAllDonations() {
    //this.donationsService.
  }

  async DeleteProject(projectid: string) {
    let res = await this.projectsService.RemoveProject(projectid)
    if (res) {

    }
    else {
      Swal.fire("Deleting Project failed")
    }
  }

  RejectDonation(donationId : string) {
    this.donationsService.DecideDonation(donationId,false).subscribe(res => {
      if (res) {
        return;
      }
      else {
        Swal.fire(`Rejecting Donation ${donationId} failed`)
      }
    })
  }

  AcceptDonation(donationId : string) {
    this.donationsService.DecideDonation(donationId,true).subscribe(res => {
      if (res) {
        return;
      }
      else {
        Swal.fire(`Accepting Donation ${donationId} failed`)
      }
    })
  }

  GenerateRange(n : number) {
    return Array.from({length : n}, (_, i) => i)
  }


}
