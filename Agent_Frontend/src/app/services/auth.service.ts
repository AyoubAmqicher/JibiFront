import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {AppStateService} from "./app-state.service";
import {jwtDecode} from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated:boolean = false;
  roles:any;
  phone:any;
  token!:any;

  constructor(private http : HttpClient, private appState : AppStateService) { }

  async login(phone : string, password : string){
    let user:any= await firstValueFrom(this.http.get("http://localhost:port-backend/users/"+phone));
    console.log(password);
    console.log(user.password);
    console.log(atob(user.password));
    if(password==atob(user.password)){
      let decodedJwt:any = jwtDecode(user.token);
      this.appState.setAuthState({
        isAuthenticated : true,
        phone : decodedJwt.sub,
        roles : decodedJwt.roles,
        token : user.token
      });
      return Promise.resolve(true);
    } else {
      return Promise.reject("Bad credentials");
    }
  }

  async changePassword(oldPassword: string, newPassword: string) {
    const phone = this.appState.authState.phone;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    const body = { oldPassword, newPassword };

    try {
      const response = await firstValueFrom(this.http.post(`http://localhost:port-backend/users/${phone}/change-password`, body, { headers }));
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject("Failed to change password");
    }
  }

  logout() {
    this.isAuthenticated = false;
    this.token = undefined;
    this.phone = undefined;
    this.roles = undefined;
  }
}
