import {Component, OnInit, signal, WritableSignal} from '@angular/core';
import {Project} from "../../../Data/Models/Project";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {User} from "../../../Data/Models/User";
import {ProjectsService} from "../../../Services/Projects/projects.service";
import {NgForOf, NgSwitch, NgSwitchCase} from "@angular/common";
import {environment} from "../../../../environments/environment";
import {FallbackimageDirective} from "../../../Utilities/FallBackImage/fallbackimage.directive";
import {AuthenticationService} from "../../../Services/Authentication/authentication.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-project-view',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf,
    FallbackimageDirective,
    NgSwitchCase,
    NgSwitch
  ],
  templateUrl: './project-view.component.html',
  styleUrl: './project-view.component.scss'
})
export class ProjectViewComponent implements OnInit{
  public projectid: string | null = ""
  public project : Project = {
    categoryId: "",
    facebook: "",
    instagram: "",
    x: "",
    status: false,
    donations: [],
    email: "",
    imagesnames: [],
    userId: "",
    category: {id: "", name: ""}, currentfund: 0, description: "", id: "", user: {} as User ,subtitle: "", title: "", totalfundrequired: 0}
  isUserLoggedIn : boolean = false
  isSuccessfulDonation : boolean = false

  constructor(private router : Router,private route: ActivatedRoute, private projectsService: ProjectsService, private authService : AuthenticationService) {

  }

  ngOnInit() {
    const segments = this.route.snapshot.url.map(segment => segment.path);
    this.isSuccessfulDonation = segments.includes("successfuldonation")
    this.route.paramMap.subscribe(params => {
      this.projectid = params.get('id')
    })
    this.authService.currentIsLoggedIn.subscribe(res => this.isUserLoggedIn = res)
    if (this.projectid !== null) {
      this.GetProject(this.projectid)
    }
    if (this.isSuccessfulDonation) {
      Swal.fire({
        title: "Donation Successful",
        text: "Thank You For Your Donation\n" +
          "a mail will be sent when your donation is accepeted by admins"
      })
    }
  }



  GetProject(projectid : string) {
    this.projectsService.GetProject(projectid).subscribe( (projectres : Project) => this.project = projectres)
  }

  GoDonate() {
    if (this.projectid !== null && this.isUserLoggedIn) {
      this.router.navigate(['/donation', this.projectid])
    }
    else {
      Swal.fire("Please Login")
    }
  }


  protected readonly environment = environment;
}
