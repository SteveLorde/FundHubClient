import {Component, signal} from '@angular/core';
import {Project} from "../../Data/Models/Project";
import {selectedproject} from "../../Services/GlobalMemoryStorage";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {BackendService} from "../../Services/Backend/backend.service";
import {SocialMedia} from "../../Data/Models/SocialMedia";
import {User} from "../../Data/Models/User";


@Component({
  selector: 'app-donation-page',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './donation-page.component.html',
  styleUrl: './donation-page.component.scss'
})
export class DonationPageComponent {
  public projectid : string | null = ""
  public project = signal<Project>({
    currentfund: 0,
     category: {id: "", name: ""},
    subtitle: "", donations: [],
    userId: "",
    totalfundrequired: 0,
    email: "", id: "", description: "", title: "",user : {} as User, imagesnames: []})
  public donationreceiptnumber : string = ''
  public donationamountview : number = 0

  constructor(private router : Router,private route: ActivatedRoute, private backend: BackendService) {

  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.projectid = params.get('id')
    })
    if (this.projectid != null) {
      this.donationreceiptnumber = this.GenerateDonationNumber()
      this.GetSelectedProject(this.projectid)
    }

  }

  donationform = new FormGroup({
    paymenttype: new FormControl(''),
    donationamount: new FormControl(''),
  })

  GetSelectedProject(projectid : string) {
    this.backend.GetProject(projectid).subscribe( (projectres : Project) => this.project.set(projectres))
  }

  SubmitDonation() {
    //create log

  }

  GenerateDonationNumber() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < 50; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
    return result;
  }

}
