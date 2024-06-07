// src/app/components/agent-form/agent-form.component.ts
import {Component, OnInit} from '@angular/core';
import { AgentService } from '../../services/agent.service';
import { Agent } from '../../model/agent.model';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-agent-form',
  templateUrl: './agent-form.component.html',
  styleUrls: ['./agent-form.component.css']
})
export class AgentFormComponent implements OnInit{
  public agentForm!: FormGroup;
  isSuccess: boolean = false;
  errorMessage: string = '';

  agent: Agent = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    cinFront: null,
    cinBack: null
  };

  constructor(private formBuilder : FormBuilder, private agentService: AgentService) { }

  ngOnInit() {
    this.agentForm = this.formBuilder.group({
      firstName: this.formBuilder.control('', [Validators.required]),
      lastName: this.formBuilder.control('', [Validators.required]),
      email: this.formBuilder.control('', [Validators.required, Validators.email]),
      phone: this.formBuilder.control('', [Validators.required, Validators.pattern('[0-9]{3}-[0-9]{3}-[0-9]{4}')]),
      password: this.formBuilder.control(btoa(this.generatedPassword())),
      cinFront: this.formBuilder.control(null, [Validators.required]),
      cinBack: this.formBuilder.control(null, [Validators.required]),
    });
  }

  onFileSelected(event: Event, field: 'cinFront' | 'cinBack') {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.agent[field] = input.files[0];
    }
  }

  onSubmit() {
    let agent : Agent = this.agentForm.value;
    this.agentService.createAgent(this.agent).subscribe({
      next: (response) => {
        console.log('Agent created successfully', response);
        this.isSuccess = true;
        alert(`Agent created successfully! Agent password: ${atob(response.password)}`);
      },
      error: (error) => {
        console.log(error);
        this.isSuccess = false;
        this.errorMessage = 'Failed to create agent. Please try again.';
      }
    });
  }

  private generatedPassword(length = 12): string {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
    let password = '';
    for (let i = 0; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  }
}
