import { Injectable } from '@angular/core';
import {User} from "../../Data/Models/User";
import {AuthRequest} from "./DTO/AuthRequest";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, firstValueFrom, map, Observable} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  isloggedin = new BehaviorSubject(false)
  authstatus = new BehaviorSubject("Login/Register")
  currentAuthStatus = this.authstatus.asObservable()
  currentIsLoggedIn = this.isloggedin.asObservable()

  constructor(private http : HttpClient) {}

   Login(loginrequest: { password: string, username: string}){
    return this.http.post<string>(environment.backendurl + '/Authentication/Login', loginrequest).pipe(
      map( (tokenres : string) => {
        localStorage.setItem('usertoken', tokenres)
        if (localStorage.getItem('usertoken') !== null) {
          return true
        }
        else {
          return false
        }
      })
    )
  }

  Logout() {
    this.isloggedin.next(false)
    localStorage.removeItem("usertoken")
    this.authstatus.next("Login/Register")
    return true
  }

  Register(registerrequest : AuthRequest) {
    let registercheck : boolean
    return this.http.post<string>(environment.backendurl + '/Authentication/Register', registerrequest).pipe(
      map( (token) => {
        if (token !== null && token !== 'undefined') {
          localStorage.setItem('usertoken', token)
          registercheck = true
          return registercheck
        }
        else {
          registercheck = false
          return registercheck
        }
      })
    )
  }

  GetActiveUser() {
    let userdata : User = {} as User
    //TOKEN WILL BE APPENDED AUTOMATICALLY IN REQUEST HEADERS
      return this.http.get( environment.backendurl + '/Authentication/GetUser').pipe(
        map( (userdatares : User) => {
          this.authstatus.next(`${userdatares.username}`)
          this.isloggedin.next(true)
          userdata = userdatares
          return userdata
          })
      )
  }

}
