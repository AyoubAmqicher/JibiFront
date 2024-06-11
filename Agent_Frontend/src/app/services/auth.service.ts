import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {AppStateService} from "./app-state.service";
import {jwtDecode} from "jwt-decode";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated:boolean = false;
  roles:any;
  phone:any;
  accessToken!:any;

  private backHost = 'http://localhost:8080';
  constructor(private http : HttpClient, private appState : AppStateService, private route:Router) { }

  public login(phone:string,password:string){
    let options  ={
      headers: new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
    }
    let params = new HttpParams().set('phone',phone).set('password',password);
    return this.http.post(`${this.backHost}/auth/login` ,params,options);
  }

  laodProfile(data :any) {
    this.accessToken = data['access_token'];
    this.isAuthenticated = true;
    let decodedJwt:any = jwtDecode(this.accessToken);
    this.phone = decodedJwt.sub;
    this.roles = decodedJwt.scope;
    window.localStorage.setItem("jwt-token",this.accessToken);
  }

  logout() {
    this.isAuthenticated = false;
    this.accessToken = undefined;
    this.phone = undefined;
    this.roles = undefined;
  }

  loadJwtTokenFromLocalStorage() {
    let token = window.localStorage.getItem("jwt-token");
    if (token) {
      this.laodProfile({"access_token": token})
      if(this.roles.includes.roles.includes('AGENT')) this.route.navigateByUrl("/agent");
      else this.route.navigateByUrl("/client");
    }else{
      this.route.navigateByUrl("/login");
    }
  }

  async changePassword(oldPassword: string, newPassword: string) {
    const phone = this.appState.authState.phone;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.accessToken}`);
    const body = { oldPassword, newPassword };

    try {
      const response = await firstValueFrom(this.http.post(`http://localhost:8080/users/${phone}/change-password`, body, { headers }));
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject("Failed to change password");
    }
  }

}
