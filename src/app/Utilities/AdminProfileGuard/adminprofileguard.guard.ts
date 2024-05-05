import { CanActivateFn } from '@angular/router';
import {AuthenticationService} from "../../Services/Authentication/authentication.service";
import {HttpClient} from "@angular/common/http";
import {inject} from "@angular/core";
import {Router} from "@angular/router";

export const adminprofileguardGuard: CanActivateFn = (route, state) => {
  let acceptRoute : boolean = false
  const authService = inject(AuthenticationService)
  const router = inject(Router)
  let isAdminType : string = ""
  if (authService.currentIsLoggedIn) {
    authService.currentLoggedUserType.subscribe(res => isAdminType = res)
    if (isAdminType === "admin") {
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
