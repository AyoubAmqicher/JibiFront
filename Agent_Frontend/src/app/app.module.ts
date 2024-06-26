import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterClientComponent } from './components/register-client/register-client.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { NavbarComponent } from './components/navbar/navbar.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { NotAuthorizedComponent } from './components/not-authorized/not-authorized.component';
import { AppHttpInterceptor } from "./services/app-http.interceptor";
import { WalletComponent } from './components/wallet/wallet.component';
import {NgIf} from "@angular/common";
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PayBillComponent } from './components/pay-bill/pay-bill.component';
import { PaymentDetailComponent } from './components/payment-detail/payment-detail.component';
import { BillConfirmationComponent } from './components/bill-confirmation/bill-confirmation.component';
import { VerifyCodeComponent } from './components/verify-code/verify-code.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterClientComponent,
    NavbarComponent,
    ChangePasswordComponent,
    NotAuthorizedComponent,
    WalletComponent,
    DashboardComponent,
    PayBillComponent,
    PaymentDetailComponent,
    BillConfirmationComponent,
    VerifyCodeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    NgIf,
    ReactiveFormsModule,
    NgIf
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
