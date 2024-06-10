import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-client-registration',
  templateUrl: './register-client.component.html',
  styleUrls: ['./register-client.component.css']
})
export class RegisterClientComponent {
  registrationForm: FormGroup;
  cinFrontFile: File | null = null;
  cinBackFile: File | null = null;
  submitted = false;
  showPasswordSection = false;
  tempPassword = 'Temp@1234';

  @ViewChild('cinFrontInput') cinFrontInput!: ElementRef;
  @ViewChild('cinBackInput') cinBackInput!: ElementRef;

  private apiUrl = 'http://localhost:8080/api/clients'; // Your backend API URL

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.registrationForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: [''],
      phone: ['', Validators.required],
      accountType: ['', Validators.required],
    });
  }

  copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard');
  }
  
  onFileChange(event: any, fileType: string) {
    const file = event.target.files[0];
    if (fileType === 'cinFront') {
      this.cinFrontFile = file;
    } else if (fileType === 'cinBack') {
      this.cinBackFile = file;
    }
  }

  resetFileInputs() {
    if (this.cinFrontInput) {
      this.cinFrontInput.nativeElement.value = '';
      this.cinFrontFile = null; // Reset the variable

    }
    if (this.cinBackInput) {
      this.cinBackInput.nativeElement.value = '';
      this.cinBackFile = null; // Reset the variable

    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.registrationForm.valid && this.cinFrontFile && this.cinBackFile) {
      const formData = new FormData();
      formData.append('firstName', this.registrationForm.get('firstName')?.value);
      formData.append('lastName', this.registrationForm.get('lastName')?.value);
      formData.append('email', this.registrationForm.get('email')?.value);
      formData.append('phone', this.registrationForm.get('phone')?.value);
      formData.append('cinFront', this.cinFrontFile);
      formData.append('cinBack', this.cinBackFile);
      const accountTypeValue = this.registrationForm.get('accountType')?.value;
      const balance = parseFloat(accountTypeValue.replace('Compte', '').trim());
      formData.append('balance', balance.toString());
      
      // Call the service method to send data to backend
      this.http.post<any>(`${this.apiUrl}/create`, formData).subscribe({
        next: (response) => {
          console.log('Client created successfully', response);
          this.tempPassword = response.temporaryPassword;
          this.showPasswordSection = true;
          this.registrationForm.reset(); // Reset the form after successful submission
          this.resetFileInputs(); // Reset the file inputs
        },
        error: (error) => {
          console.error('Error creating client', error);
        },
        complete: () => {
          console.log('Request complete');
        }
      });
    }
  }
}
