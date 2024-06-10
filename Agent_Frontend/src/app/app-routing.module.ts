import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterClientComponent } from './components/register-client/register-client.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { NotAuthorizedComponent } from "./components/not-authorized/not-authorized.component";
import { WalletComponent } from "./components/wallet/wallet.component";
import { AuthenticationGuard } from "./guards/authentication.guard";
import { AuthorizationGuard } from "./guards/authorization.guard";

const routes: Routes = [
  {path : "login", component: LoginComponent},
  {
    // path : "agent", component : RegisterClientComponent,canActivate:[AuthenticationGuard], children :[
      path : "agent", component : RegisterClientComponent, children :[
      {path : "register-client", component : RegisterClientComponent},
      // {path : "change-password", component : ChangePasswordComponent, canActivate:[AuthorizationGuard], data :{requiredRoles :'AGENT'}
      {path : "change-password", component : ChangePasswordComponent},
      {path : "notAuthorized", component : NotAuthorizedComponent}
    ]
  },
  {path : "change-password", component: ChangePasswordComponent},
  {path : "notAuthorized", component : NotAuthorizedComponent},
  {path : "wallet", component : WalletComponent},



  {
    // path : "client", component : WalletComponent,canActivate:[AuthenticationGuard], children :[
      path : "client", component : WalletComponent, children :[

      {path : "wallet", component : WalletComponent},
      {path : "change-password", component : ChangePasswordComponent, canActivate:[AuthorizationGuard], data :{requiredRoles :'CLIENT'}
      },
      {path : "notAuthorized", component : NotAuthorizedComponent}
    ]
  },
  {path : "", redirectTo : "login", pathMatch :'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
