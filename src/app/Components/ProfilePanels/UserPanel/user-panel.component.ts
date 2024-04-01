import {Component, OnInit, signal} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {Project} from "../../../Data/Models/Project";
import {User} from "../../../Data/Models/User";
import {BackendService} from "../../../Services/Backend/backend.service";
import {AuthenticationService} from "../../../Services/Authentication/authentication.service";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {FundRequestFormComponent} from "../../FundProjectForm/fund-request-form.component";
import {Donation} from "../../../Data/Models/Donation";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-user-panel',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    NgForOf,
    FundRequestFormComponent
  ],
  templateUrl: './user-panel.component.html',
  styleUrl: './user-panel.component.scss'
})
export class UserPanelComponent implements OnInit{
  userownsproject : boolean = false;

  public project : Project = {
    email: "", imagesnames: [], userId: "", user: {} as User,
    category: {id: "", name: ""},
    currentfund: 0, description: "", id: "", subtitle: "", title: "", totalfundrequired: 0, donations: []}
  public user : User = {
    email: "",
    facebook: "",
    instagram: "",
    phonenumber: "",
    profileimage: "",
    project: {} as Project,
    x_socialmedia: "",
    usertype: "", description: "", id: "", password: "", username: "", donations: []
  }
  edituserinfo : boolean = false
  editprojectinfo : boolean = false
  openprojectform : boolean = false
  userdonations : Donation[] = []

  constructor(private auth : AuthenticationService, private backend : BackendService) {

  }

  ngOnInit() {
    this.GetUserData()
    this.SetProject()
  }

  userform = new FormGroup({
    username: new FormControl(''),
    description: new FormControl(''),
    facebook: new FormControl(''),
    instagram: new FormControl(''),
    phonenumber: new FormControl(''),
    email: new FormControl(''),
  });

  projectform = new FormGroup({
    projectname: new FormControl(''),
    description: new FormControl(''),
    facebook: new FormControl(''),
    instagram: new FormControl(''),
    phonenumber: new FormControl(''),
    email: new FormControl(''),
  });

  OpenFundForm() {
    this.openprojectform = true
  }

  RemoveProject() {
    this.backend.RemoveProject(this.project.id)
  }

  GetUserData() {
    this.auth.GetActiveUser().subscribe(userdatares => this.user = userdatares)
  }

  SetProject() {
    this.project = this.user.project
  }

  onFileSelected(e : any) {

  }

  protected readonly environment = environment;
}
