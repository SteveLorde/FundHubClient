import {Component, signal, WritableSignal} from '@angular/core';
import {Project} from "../../Data/Models/Project";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {User} from "../../Data/Models/User";
import {BackendService} from "../../Services/Backend/backend.service";
import {NgForOf, NgSwitch, NgSwitchCase} from "@angular/common";
import {environment} from "../../../environments/environment";
import {FallbackimageDirective} from "../../Utilities/FallBackImage/fallbackimage.directive";

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
export class ProjectViewComponent {
  public projectid: string | null = ""
  public project : Project = {
    donations: [],
    email: "",
    imagesnames: [],
    userId: "",
    category: {id: "", name: ""}, currentfund: 0, description: "", id: "", user: {} as User ,subtitle: "", title: "", totalfundrequired: 0}

  constructor(private router : Router,private route: ActivatedRoute, private backend: BackendService) {

  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.projectid = params.get('id')
    })
    if (this.projectid != null) {
      this.GetProject(this.projectid)
    }
    let ownid = "c0c343f3-a9d0-4ae6-93e4-0d1923b04e60"
  }



  GetProject(projectid : string) {
    this.backend.GetProject(projectid).subscribe( (projectres : Project) => this.project = projectres)
  }

  GoDonate() {
    if (this.projectid != null) {
      this.router.navigate(['/donation', this.projectid])
    }
  }


  protected readonly environment = environment;
}
