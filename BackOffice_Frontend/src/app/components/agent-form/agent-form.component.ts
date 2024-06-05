// src/app/components/agent-form/agent-form.component.ts
import { Component } from '@angular/core';
import { AgentService } from '../../services/agent.service';
import { Agent } from '../../model/agent.model';

@Component({
  selector: 'app-agent-form',
  templateUrl: './agent-form.component.html',
  styleUrls: ['./agent-form.component.css']
})
export class AgentFormComponent {
  agent: Agent = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    cinFront: null,
    cinBack: null
  };

  constructor(private agentService: AgentService) { }

  onFileSelected(event: Event, field: 'cinFront' | 'cinBack') {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.agent[field] = input.files[0];
    }
  }

  onSubmit() {
    this.agentService.createAgent(this.agent).subscribe(response => {
      console.log('Agent created successfully', response);
    });
  }
}
