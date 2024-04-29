import { CanActivateFn } from '@angular/router';
import {inject} from "@angular/core";
import {AuthenticationService} from "../../Services/Authentication/authentication.service";

export const profileguardGuard: CanActivateFn = (route, state) => {

  let acceptRoute : boolean = false;
  const authService = inject(AuthenticationService)
  let isUserType : string = ""
  if (authService.currentIsLoggedIn) {
    authService.currentLoggedUserType.subscribe(res => isUserType = res)
    if (isUserType === "user" || "admin") {
      acceptRoute = true;
    } else {
      acceptRoute = false;
    }
  }
  return acceptRoute;
};
