import { Component, OnInit } from '@angular/core';
import { AgentService } from '../../services/agent.service';
import { Agent } from '../../model/agent.model';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-agent-list',
  templateUrl: './agent-list.component.html',
  styleUrls: ['./agent-list.component.css']
})
export class AgentListComponent implements OnInit {
  agents: Agent[] = [];
  filteredAgents: Agent[] = [];
  selectedAgent!: Agent;

  currentPage: number = 1;
  pageSize: number = 4; // Adjust this value to change the number of items per page
  totalPages: number = 1;
  searchControl = new FormControl('');



  constructor(private agentService: AgentService) { }

  ngOnInit() {
    this.agentService.getAllAgents().subscribe({
      next: (response) => {
        this.agents = response;
        this.filteredAgents = this.agents;
        this.totalPages = Math.ceil(this.agents.length / this.pageSize);
      },
      error: (error) => {
        console.error('Error fetching agents', error);
      }
    });

    this.searchControl.valueChanges.subscribe(value => {
      this.filterAgents(value ? value : "");
      console.log(value);
    });
    
  }

  filterAgents(searchTerm: string) {
    this.filteredAgents = this.agents.filter(agent =>
      (agent.firstName && agent.firstName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (agent.lastName && agent.lastName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (agent.email && agent.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (agent.phone && agent.phone.includes(searchTerm)) ||
      (agent.agence && agent.agence.name.toLowerCase().includes(searchTerm))
    );
    this.totalPages = Math.ceil(this.filteredAgents.length / this.pageSize);
    this.currentPage = 1; // Reset to the first page after filtering
  }

  toggleDropdown(agent: any) {
    agent.showDropdown = !agent.showDropdown;
  }

  updateAgent(agent: any) {
    // Your update logic
    console.log('Update agent', agent);
    agent.showDropdown = false;
  }

  deleteAgent(agent: any) {
    // Your delete logic
    console.log('Delete agent', agent);
    agent.showDropdown = false;
  }
  

  getCurrentPageAgents(): Agent[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.filteredAgents.slice(startIndex, endIndex);
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

  openModal(agent: Agent) {
    this.selectedAgent = agent;
    document.getElementById('agent-details-modal')?.classList.remove('hidden');
  }
  
}
