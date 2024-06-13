import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgentFormComponent } from './components/agent-form/agent-form.component';
import { AgentListComponent } from './components/agent-list/agent-list.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AgentDetailsModalComponent } from './components/agent-details-modal/agent-details-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    AgentFormComponent,
    AgentListComponent,
    NavbarComponent,
    AgentDetailsModalComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
