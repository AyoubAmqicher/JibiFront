import { Component, OnInit } from '@angular/core';
import { AgentService } from '../../services/agent.service';
import { Agent } from '../../model/agent.model';
import { FormControl } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-agent-list',
  templateUrl: './agent-list.component.html',
  styleUrls: ['./agent-list.component.css']
})
export class AgentListComponent implements OnInit {
  agents: Agent[] = [];
  filteredAgents: Agent[] = [];
  selectedAgent!: Agent;
  showUpdateModal = false;
  currentPage: number = 1;
  pageSize: number = 4; // Adjust this value to change the number of items per page
  totalPages: number = 1;
  searchControl = new FormControl('');
  updateForm: FormGroup;
  agences: { id: number, name: string }[] = [
    { id: 1, name: 'Jibi Casablanca' },
    { id: 2, name: 'Jibi Rabat' },
    { id: 3, name: 'Jibi Marrakech' },
    { id: 4, name: 'Jibi Fès' },
    { id: 5, name: 'Jibi Tangier' },
    { id: 6, name: 'Jibi Agadir' },
    { id: 7, name: 'Jibi Oujda' },
    { id: 8, name: 'Jibi Kenitra' },
    { id: 9, name: 'Jibi Meknes' },
    { id: 10, name: 'Jibi El Jadida' }
  ];

  constructor(private agentService: AgentService,private fb: FormBuilder) { 
    this.updateForm = this.fb.group({
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      agence: [null, Validators.required]
  });
  }

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

  updateAgent(agent: Agent): void {
    this.selectedAgent = agent;
    this.updateForm.setValue({
        lastName: agent.lastName,
        firstName: agent.firstName,
        email: agent.email,
        phone: agent.phone,
        agence: agent.agence.id
    });
    this.showUpdateModal = true;
    agent.showDropdown = false;
  }

  closeUpdateModal(): void {
    this.showUpdateModal = false;
  }

  onUpdateSubmit(): void {
    const updatedData = this.updateForm.value;
    console.log(updatedData);
    this.agentService.updateAgent(this.selectedAgent.id, updatedData).subscribe({
        next: () => {
            Object.assign(this.selectedAgent, updatedData);
            this.selectedAgent.agence=this.agences.filter(a => a.id == updatedData.agence)[0];
            this.closeUpdateModal();
            console.log('Agent updated successfully');
        },
        error: (error) => {
            console.error('Error updating agent', error);
        }
    });
  }

  deleteAgent(agent: Agent): void {
    this.agentService.deleteAgentById(agent.id).subscribe({
        next: () => {
            // Remove the deleted agent from the lists
            this.agents = this.agents.filter(a => a.id !== agent.id);
            this.filteredAgents = this.filteredAgents.filter(a => a.id !== agent.id);

            // Update pagination
            this.totalPages = Math.ceil(this.filteredAgents.length / this.pageSize);
            this.currentPage = 1; // Reset to the first page after deletion
        },
        error: (error) => {
            console.error('Error deleting agent', error);
        }
    });
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
