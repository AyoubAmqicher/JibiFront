import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {firstValueFrom, Observable} from "rxjs";

// import {AppStateService} from "./app-state.service";
// import {jwtDecode} from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost:8080';
    isAuthenticated:boolean = false;
    roles:any;
    phone:any;
    token!:any;

    constructor(private http : HttpClient) { }

    login(username: string, password: string): Observable<string> {
        const httpOptions = {
            headers: {
                Authorization: 'Basic ' + window.btoa(username + ':' + password)
            },
            responseType: 'text' as 'text',
        };
        return this.http.post(`${this.apiUrl}/api/auth`, null, httpOptions);
    }

//   async changePassword(oldPassword: string, newPassword: string) {
//     const phone = this.appState.authState.phone;
//     const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
//     const body = { oldPassword, newPassword };

//     try {
//       const response = await firstValueFrom(this.http.post(`http://localhost:port-backend/users/${phone}/change-password`, body, { headers }));
//       return Promise.resolve(response);
//     } catch (error) {
//       return Promise.reject("Failed to change password");
//     }
//   }

//   logout() {
//     this.isAuthenticated = false;
//     this.token = undefined;
//     this.phone = undefined;
//     this.roles = undefined;
//   }
}
