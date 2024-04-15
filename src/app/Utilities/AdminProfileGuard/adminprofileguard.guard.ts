import { CanActivateFn } from '@angular/router';
import {AuthenticationService} from "../../Services/Authentication/authentication.service";
import {HttpClient} from "@angular/common/http";
import {inject} from "@angular/core";

export const adminprofileguardGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthenticationService)
  let isAdminType : string = ""
  authService.currentLoggedUserType.subscribe(res => isAdminType = res)
  if (isAdminType === "admin") {
    return true;
  }
  else {
    return false
  }
};
