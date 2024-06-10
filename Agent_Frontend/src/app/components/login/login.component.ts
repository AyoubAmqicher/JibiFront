import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {AppStateService} from "../../services/app-state.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  formLogin! : FormGroup;
  errorMessage =undefined;

  constructor(private appState :AppStateService, private fb : FormBuilder, private router : Router, private authService : AuthService) { }

  ngOnInit() {
    this.formLogin=this.fb.group({
      phone : this.fb.control(""),
      password : this.fb.control("")
    })
  }

  handleLogin() {
    let phone=this.formLogin.value.phone;
    let password=this.formLogin.value.password;
    this.authService.login(phone, password)
      .then(resp=>{
        if(this.appState.authState.roles.includes('AGENT')) this.router.navigateByUrl("/agent");
        else this.router.navigateByUrl("/client");
      })
      .catch(error=>{
        this.errorMessage=error;
      })
  }
}
