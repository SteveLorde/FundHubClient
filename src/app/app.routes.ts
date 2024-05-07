import { Routes } from '@angular/router';
import {HomePageComponent} from "./Views/Pages/Home/home-page.component";
import {ProfilePageComponent} from "./Views/Pages/Profile/profile-page.component";
import {ProjectsPageComponent} from "./Views/Pages/Projects/projects-page.component";
import {ProjectViewComponent} from "./Views/Pages/ProjectView/project-view.component";
import {LoginRegisterPageComponent} from "./Views/Pages/LoginRegister/login-register-page.component";
import {DonationPageComponent} from "./Views/Pages/Donation/donation-page.component";
import {profileguardGuard} from "./Utilities/ProfileGuard/profileguard.guard";
import {adminprofileguardGuard} from "./Utilities/AdminProfileGuard/adminprofileguard.guard";
import {AdminprofileviewPageComponent} from "./Views/Components/ProfilePanels/AdminPanel/AdminProjectView/adminprofileview-page.component";
import {UnderconstructionComponent} from "./Views/Pages/UnderConstruction/underconstruction.component";
import {underconstructionGuard} from "./Utilities/UnderConstructionRouteGuard/underconstruction.guard";

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  {path: "undercon", component: UnderconstructionComponent},
  { path: 'projects', component: ProjectsPageComponent },
  { path: 'loginregister', component: LoginRegisterPageComponent },
  //RE-ROUTE AFTER SUCCESSFUL DONATION
  { path: 'viewproject/:id/successfuldonation', component: ProjectViewComponent },
  { path: 'viewproject/:id', component: ProjectViewComponent },
  { path: 'profile', component: ProfilePageComponent, canActivate: [underconstructionGuard]  },
  { path: 'admin/view/:id', component: AdminprofileviewPageComponent, canActivate: [underconstructionGuard]  },
  { path: 'donation/:id', component: DonationPageComponent, canActivate: [profileguardGuard]  },
];
