import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})

export class LoginGuard {

  constructor(private authService : AuthService, private router : Router) { }

  public canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if ( !sessionStorage.getItem("app.token")) {
        return true;
    } else {
        if(this.authService.isUserInRole("ROLE_ADMIN")) this.router.navigateByUrl("/list-agents");
        if(this.authService.isUserInRole("ROLE_USER")) this.router.navigateByUrl("/change-password");
        return false;
    }
}
}
