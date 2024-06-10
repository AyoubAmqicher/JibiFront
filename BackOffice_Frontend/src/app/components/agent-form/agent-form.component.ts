import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AgentService } from '../../services/agent.service';

@Component({
  selector: 'app-agent-creation',
  templateUrl: './agent-form.component.html',
  styleUrls: ['./agent-form.component.css']
})
export class AgentFormComponent implements OnInit {
  agentForm!: FormGroup;
  agentId: string | null = null;
  agentPassword: string | null = null;

  @ViewChild('cinFrontInput') cinFrontInput!: ElementRef;
  @ViewChild('cinBackInput') cinBackInput!: ElementRef;

  constructor(private agentService: AgentService) { }

  ngOnInit(): void {
    this.agentForm = new FormGroup({
      lastName: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', Validators.required),
      cinFront: new FormControl(null, Validators.required),
      cinBack: new FormControl(null, Validators.required)
    });
  }

  onSubmit() {
    const formData = new FormData();
    for (const key in this.agentForm.value) {
      if (this.agentForm.value.hasOwnProperty(key)) {
        const value = this.agentForm.value[key];
        if (value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, value);
        }
      }
    }

    this.agentService.createAgent(formData).subscribe({
      next: (response) => {
        console.log('Agent created successfully', response);
        this.agentId = response.id.toString(); // Ensure the ID is a string
        this.agentPassword = response.password;
        this.agentForm.reset(); // Reset the form after successful submission
        this.resetFileInputs(); // Reset the file inputs
      },
      error: (error) => {
        console.error('Error creating agent', error);
      },
      complete: () => {
        console.log('Request complete');
      }
    });
  }

  resetFileInputs() {
    if (this.cinFrontInput) {
      this.cinFrontInput.nativeElement.value = '';
    }
    if (this.cinBackInput) {
      this.cinBackInput.nativeElement.value = '';
    }
  }

  copyToClipboard(value: string) {
    navigator.clipboard.writeText(value).then(() => {
      console.log('Copied to clipboard successfully!');
    }, (err) => {
      console.error('Could not copy text: ', err);
    });
  }

  onFileSelect(event: Event, controlName: string) {
    const file = (event.target as HTMLInputElement).files![0];
    this.agentForm.patchValue({ [controlName]: file });
    this.agentForm.get(controlName)?.updateValueAndValidity();
  }
}
