import { Routes } from '@angular/router';
import {HomePageComponent} from "./Pages/Home/home-page.component";
import {ProfilePageComponent} from "./Pages/Profile/profile-page.component";
import {ProjectsPageComponent} from "./Pages/Projects/projects-page.component";
import {ProjectViewComponent} from "./Pages/ProjectView/project-view.component";
import {LoginRegisterPageComponent} from "./Pages/LoginRegister/login-register-page.component";
import {DonationPageComponent} from "./Pages/Donation/donation-page.component";
import {profileguardGuard} from "./Utilities/ProfileGuard/profileguard.guard";

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'projects', component: ProjectsPageComponent },
  { path: 'loginregister', component: LoginRegisterPageComponent },
  { path: 'viewproject/:id', component: ProjectViewComponent },
  { path: 'profile', component: ProfilePageComponent, canActivate: [profileguardGuard]  },
  { path: 'donation/:id', component: DonationPageComponent  },

];
