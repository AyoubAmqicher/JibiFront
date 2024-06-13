import { Component, Input } from '@angular/core';
import { Agent } from '../../model/agent.model';

@Component({
  selector: 'app-agent-details-modal',
  templateUrl: './agent-details-modal.component.html',
  styleUrls: ['./agent-details-modal.component.css']
})
export class AgentDetailsModalComponent {
  @Input() agent!: Agent;

  closeModal() {
    // Logic to close the modal
    document.getElementById('agent-details-modal')?.classList.add('hidden');
  }
}
