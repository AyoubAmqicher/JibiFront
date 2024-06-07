import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Client } from '../../model/client.model';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-register-client',
  templateUrl: './register-client.component.html',
  styleUrls: ['./register-client.component.css']
})
export class RegisterClientComponent implements OnInit{
  public clientForm!: FormGroup;
  isSuccess: boolean = false;
  errorMessage: string = '';

  client: Client = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    cinFront: null,
    cinBack: null
  };

  constructor(private formBuilder : FormBuilder, private clientService: ClientService) { }

  ngOnInit() {
    this.clientForm = this.formBuilder.group({
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
      this.client[field] = input.files[0];
    }
  }

  onSubmit() {
    let client : Client = this.clientForm.value;
    this.clientService.saveClient(this.client).subscribe({
      next: (response) => {
        console.log('Client created successfully', response);
        this.isSuccess = true;
        alert(`Client created successfully! Client password: ${atob(response.password)}`);
      },
      error: (error) => {
        console.log(error);
        this.isSuccess = false;
        this.errorMessage = 'Failed to create client. Please try again.';
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
