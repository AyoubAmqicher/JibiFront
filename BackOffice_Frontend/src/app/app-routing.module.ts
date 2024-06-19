import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgentFormComponent } from './components/agent-form/agent-form.component';
import { AgentListComponent } from './components/agent-list/agent-list.component';
import { LoginComponent } from './components/login/login.component';
import { AuthenticationGuard } from './guards/Authentication.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  { path: 'create-agent', component: AgentFormComponent,canActivate: [AuthenticationGuard], data: {role: 'ROLE_ADMIN'}} ,
  { path: 'list-agents', component: AgentListComponent,canActivate: [AuthenticationGuard], data: {role: 'ROLE_ADMIN'} },
  { path: 'login', component: LoginComponent,canActivate: [LoginGuard] },
  { path: '', redirectTo: '/create-agent', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
