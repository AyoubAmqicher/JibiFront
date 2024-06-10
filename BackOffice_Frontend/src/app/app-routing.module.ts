import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgentFormComponent } from './components/agent-form/agent-form.component';
import { AgentListComponent } from './components/agent-list/agent-list.component';

const routes: Routes = [
  { path: 'create-agent', component: AgentFormComponent },
  { path: 'list-agents', component: AgentListComponent },
  { path: '', redirectTo: '/create-agent', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
