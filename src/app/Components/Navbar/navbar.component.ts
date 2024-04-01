import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {AuthenticationService} from "../../Services/Authentication/authentication.service";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  authstatus : string = ""
  isLoggedIn: boolean = false
  IsMobileMenuOpen: boolean = false
  @ViewChild('MobileMenu') mobileMenuElement : ElementRef

  constructor(private router: Router, private authservice : AuthenticationService) {

  }

  ngOnInit() {
    this.authservice.currentIsLoggedIn.subscribe(res => this.isLoggedIn = res)
    this.authservice.currentAuthStatus.subscribe(res => this.authstatus = res)
  }

  GoHome() {
    this.router.navigate([''])
  }

  OpenMobileMenu(){
    if (!this.IsMobileMenuOpen) {
      this.mobileMenuElement.nativeElement.left = 0
      this.IsMobileMenuOpen = true
    }
    else {
      this.mobileMenuElement.nativeElement.left = -250
      this.IsMobileMenuOpen = false
    }
  }





}
