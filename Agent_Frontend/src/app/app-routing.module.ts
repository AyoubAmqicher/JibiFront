import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterClientComponent } from './components/register-client/register-client.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { NotAuthorizedComponent } from "./components/not-authorized/not-authorized.component";
import { WalletComponent } from "./components/wallet/wallet.component";
import { AuthenticationGuard } from "./guards/authentication.guard";
import { AuthorizationGuard } from "./guards/authorization.guard";
import {PayBillComponent} from "./components/pay-bill/pay-bill.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {PaymentDetailComponent} from "./components/payment-detail/payment-detail.component";
import {BillConfirmationComponent} from "./components/bill-confirmation/bill-confirmation.component";
import {VerifyCodeComponent} from "./components/verify-code/verify-code.component";

const routes: Routes = [
  { path: 'pay-bill', component: PayBillComponent },
  {path : "login", component: LoginComponent},
  { path: 'pay-bill/:id', component: PaymentDetailComponent },
  { path: 'pay-bill/:billerId/bill/:billId', component: BillConfirmationComponent },
  { path: 'verify-code/:billerId/:billId', component: VerifyCodeComponent },
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
