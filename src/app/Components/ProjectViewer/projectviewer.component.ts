import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {environment} from "../../../environments/environment";
import {NgForOf, NgSwitch, NgSwitchCase} from "@angular/common";
import {Project} from "../../Data/Models/Project";
import {ProjectsService} from "../../Services/Projects/projects.service";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {BehaviorSubject} from "rxjs";
import Swal from "sweetalert2";
import {Category} from "../../Data/Models/Category";
import {AuthenticationService} from "../../Services/Authentication/authentication.service";

@Component({
  selector: 'app-projectviewer',
  standalone: true,
  imports: [
    NgForOf,
    NgSwitchCase,
    NgSwitch,
    ReactiveFormsModule
  ],
  templateUrl: './projectviewer.component.html',
  styleUrl: './projectviewer.component.scss'
})
export class ProjectviewerComponent implements OnChanges{

  editStatus = new BehaviorSubject(false)
  categories : Category[] = []
  @Input() userType : string = "user" || "admin"
  @Input() projectid : string = ""
  @Input() editProject : boolean = false
  project : Project = {} as Project
  imagesToUpload : File[] = []
  imageUrls : string[] = []

  constructor(private projectsService: ProjectsService, private authService : AuthenticationService) {
  }

  ngOnChanges(changes: SimpleChanges) {

  }

  projectForm = new FormGroup({
    title : new FormControl(`${this.project.title}`),
    subtitle : new FormControl(`${this.project.subtitle}`),
    description : new FormControl(`${this.project.description}`),
    categoryId : new FormControl(''),
    totalfundrequired : new FormControl(`${this.project.totalfundrequired}`),
    email : new FormControl(`${this.project.email}`),
    phonenumber : new FormControl(`${this.project.email}`),
    x : new FormControl(`${this.project.x}`),
    facebook : new FormControl(`${this.project.facebook}`),
    instagram : new FormControl(`${this.project.instagram}`),
  })

  GetProject() {
    this.projectsService.GetProject(this.projectid).subscribe(res => this.project = res)
  }

  UploadImage() {

  }

  EditProject() {
    this.editStatus.next(true)
  }

  UnlockEditForm() {

  }

  SaveProject() {

  }

  CheckLogin() {
    if (!this.authService.isLoggedIn) {
      Swal.fire("Please Login")
      return false
    }
    else {
      return true
    }
  }

  onFileChange(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      for (let i = 0; i < fileList.length; i++) {
        const file: File = fileList[i];
        this.imagesToUpload.push(file)
        this.readImageFile(file)
      }
    }
  }

  readImageFile(file: File) {
    const reader = new FileReader()
    reader.readAsDataURL(file);
    reader.onload = (e: any) => {
      this.imageUrls.push(e.target.result)
    }
  }

  protected readonly environment = environment;




}
