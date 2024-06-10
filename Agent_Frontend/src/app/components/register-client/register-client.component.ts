import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(private fb: FormBuilder) {
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
    }
    if (this.cinBackInput) {
      this.cinBackInput.nativeElement.value = '';
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
      formData.append('accountType', this.registrationForm.get('accountType')?.value);
      // Here you can send formData to your backend API
      // this.http.post('your-api-endpoint', formData).subscribe(response => {
      //   console.log(response);
      // });
      console.log('Form Submitted', formData);
      this.showPasswordSection = true;
      this.registrationForm.reset(); // Reset the form after successful submission
        this.resetFileInputs();
    }
  }
}
