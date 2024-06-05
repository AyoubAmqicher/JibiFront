import { Component, OnInit } from '@angular/core';
import { AgentService } from '../../services/agent.service';
import { Agent } from '../../model/agent.model';

@Component({
  selector: 'app-agent-list',
  templateUrl: './agent-list.component.html',
  styleUrls: ['./agent-list.component.css']
})
export class AgentListComponent implements OnInit {
  agents: Agent[] = [];

  constructor(private agentService: AgentService) { }

  ngOnInit() {
    this.agentService.getAgents().subscribe(response => {
      this.agents = response;
    });
  }
}
