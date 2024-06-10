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
  currentPage: number = 1;
  pageSize: number = 4; // Adjust this value to change the number of items per page
  totalPages: number = 1;


  constructor(private agentService: AgentService) { }

  ngOnInit() {
    this.agentService.getAllAgents().subscribe({
      next: (response) => {
        this.agents = response;
        this.totalPages = Math.ceil(this.agents.length / this.pageSize);
      },
      error: (error) => {
        console.error('Error fetching agents', error);
      }
    });
  }

  getCurrentPageAgents(): Agent[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.agents.slice(startIndex, endIndex);
  }
  
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }
  
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
  
}
