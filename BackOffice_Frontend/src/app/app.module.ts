import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgentFormComponent } from './components/agent-form/agent-form.component';
import { AgentListComponent } from './components/agent-list/agent-list.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AgentDetailsModalComponent } from './components/agent-details-modal/agent-details-modal.component';
import { LoginComponent } from './components/login/login.component';
import { LoadingService } from './services/loading.service';
import { AppHttpInterceptor } from './services/app-http.interceptor';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    AgentFormComponent,
    AgentListComponent,
    NavbarComponent,
    AgentDetailsModalComponent,
    LoginComponent,
    LoadingSpinnerComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule
    ],
  providers: [LoadingService,{
    provide: HTTP_INTERCEPTORS,
    useClass: AppHttpInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
