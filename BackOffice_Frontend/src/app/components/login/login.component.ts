import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
// import {AppStateService} from "../../services/app-state.service";
import  { JwtPayload,jwtDecode } from 'jwt-decode';

interface CustomJwtPayload extends JwtPayload {
  firstName: string;
  lastName: string;
  scope: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  formLogin! : FormGroup;
  errorMessage! :string;

  // constructor(private appState :AppStateService, private fb : FormBuilder, private router : Router, private authService : AuthService) { }
  constructor(private fb : FormBuilder, private router : Router,private authService : AuthService) { }

  ngOnInit() {
    this.formLogin=this.fb.group({
      id : this.fb.control(""),
      password : this.fb.control("")
    })
  }
      // this.authService.login(phone, password)
    //   .then(resp=>{
    //     if(this.appState.authState.roles.includes('AGENT')) this.router.navigateByUrl("/agent");
    //     else this.router.navigateByUrl("/client");
    //   })
    //   .catch(error=>{
    //     this.errorMessage=error;
    //   })

  handleLogin() {
    let id=this.formLogin.value.id;
    let password=this.formLogin.value.password;
    sessionStorage.removeItem("app.token");
    this.authService.login(id, password)
        .subscribe({
            next: (token) => {
                sessionStorage.setItem("app.token", token);
                const decodedToken = jwtDecode<CustomJwtPayload>(token);
                // @ts-ignore
                sessionStorage.setItem("app.roles",  decodedToken.scope);
                sessionStorage.setItem("app.firstName",  decodedToken.firstName);
                sessionStorage.setItem("app.lastName",  decodedToken.lastName);
                console.log(sessionStorage.getItem("app.firstName"));
                this.authService.isAuthenticated = true;
                console.log("is authenticated");
                if(this.authService.isUserInRole("ROLE_ADMIN")) this.router.navigateByUrl("/list-agents");
            },
            error: (error) => this.errorMessage="Bad Credentiels"
        });
  }
}
