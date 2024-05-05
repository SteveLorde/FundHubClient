import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthenticationService} from "../../Services/Authentication/authentication.service";

export const profileguardGuard: CanActivateFn = (route, state) => {
  let acceptRoute : boolean = false;
  const authService = inject(AuthenticationService)
  const router = inject(Router)

  let isUserType : string = ""
  if (authService.currentIsLoggedIn) {
    authService.currentLoggedUserType.subscribe(res => isUserType = res)
    if (isUserType === "user" || "admin") {
      acceptRoute = true
    } else {
      acceptRoute = false
    }
  }
  if (acceptRoute) {
    return true
  }
  else {
    router.navigate(["/loginregister"])
    return false
  }
};
