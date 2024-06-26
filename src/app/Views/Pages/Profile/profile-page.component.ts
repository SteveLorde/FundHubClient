import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../../Services/Authentication/authentication.service";
import {UserPanelComponent} from "../../Components/ProfilePanels/UserPanel/user-panel.component";
import {NgIf} from "@angular/common";
import {AdminPanelComponent} from "../../Components/ProfilePanels/AdminPanel/admin-panel.component";
import {Router} from "@angular/router";
import {User} from "../../../Data/Models/User";

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [
    UserPanelComponent,
    NgIf,
    AdminPanelComponent
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent implements OnInit{
  showuserpanel : boolean = false
  showadminpanel : boolean = false
  user = {} as User

  constructor(private router : Router, private authService: AuthenticationService) {

  }

  ngOnInit() {
    this.GetUserType()
  }

  Logout() {
    let check : boolean = this.authService.Logout()
    if (check) {
      this.router.navigate(['/'])
    }
  }
   GetUserType() {
    this.authService.GetActiveUser().subscribe( userdatares => {
      this.user = userdatares
      if (this.user.usertype == "user") {
        this.showadminpanel = false
        this.showuserpanel = true
      }
      else if (this.user.usertype == "admin") {
        this.showadminpanel = true
        this.showuserpanel = false
      }
      else {
        this.showadminpanel = false
        this.showuserpanel = false
      }
    })

  }

}
