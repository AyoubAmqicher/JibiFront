import {Component } from '@angular/core';
import {AppStateService} from "../../services/app-state.service";
import {LoadingService} from "../../services/loading.service";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent {

  constructor(private authService: AuthService, public appState :AppStateService, public loadingService : LoadingService, private router : Router) { }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl("/login");
  }

  login() {
    this.router.navigateByUrl("/login");
  }
}
