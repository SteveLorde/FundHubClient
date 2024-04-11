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

  isLoggedIn = new BehaviorSubject(false)
  authStatus = new BehaviorSubject("Login/Register")
  //loggedUserData : User = {} as User
  currentIsLoggedIn = this.isLoggedIn.asObservable()
  currentAuthStatus = this.authStatus.asObservable()


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

  AutoCheckLogin() {
    return this.http.get(environment.backendurl + "/Authentication/CheckToken").pipe(
      map( (boolres : boolean) => {
        if (boolres) {
          this.GetActiveUser().subscribe()
          this.isLoggedIn.next(true)
        }
        else {
          this.isLoggedIn.next(false)
        }
        })
    )
  }

  Logout() {
    this.isLoggedIn.next(false)
    localStorage.removeItem("usertoken")
    this.authStatus.next("Login/Register")
    return true
  }

  Register(registerrequest : AuthRequest) {
    let registercheck : boolean
    return this.http.post<string>(environment.backendurl + '/Authentication/Register', registerrequest).pipe(
      map( (tokenres) => {
        if (tokenres !== null) {
          localStorage.setItem('usertoken', tokenres)
          registercheck = true
        }
        else {
          registercheck = false
        }
        return registercheck
      })
    )
  }

  GetActiveUser() {
    let userdata : User = {} as User
    //TOKEN WILL BE APPENDED AUTOMATICALLY IN REQUEST HEADERS
      return this.http.get( environment.backendurl + '/Authentication/GetLoggedUser').pipe(
        map( (userdatares : User) => {
          this.authStatus.next(`${userdatares.username}`)
          userdata = userdatares
          return userdata
          })
      )
  }

}
