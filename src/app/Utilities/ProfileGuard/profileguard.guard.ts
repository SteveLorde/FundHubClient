import { CanActivateFn } from '@angular/router';

export const profileguardGuard: CanActivateFn = (route, state) => {
  let checkusertokenfound : boolean = false
  if (typeof localStorage !== 'undefined') {
    if (localStorage.getItem('usertoken') !== null && localStorage.getItem('usertoken') !== 'undefined' ) {
      checkusertokenfound = true
    }
  }
  else {
    checkusertokenfound = false;
  }
  return checkusertokenfound
};
