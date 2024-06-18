import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
// import {AppStateService} from "../../services/app-state.service";
import  { JwtPayload,jwtDecode } from 'jwt-decode';

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
                const decodedToken = jwtDecode<JwtPayload>(token);
                // @ts-ignore
                sessionStorage.setItem("app.roles",  decodedToken.scope);
                this.router.navigateByUrl("/create-agent");
            },
            error: (error) => this.errorMessage="Bad Credentiels"
        });
  }
}
