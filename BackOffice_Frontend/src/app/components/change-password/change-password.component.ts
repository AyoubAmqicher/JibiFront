import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  formChangePassword!: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.formChangePassword = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmNewPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.controls['newPassword'].value === form.controls['confirmNewPassword'].value ? null : { mismatch: true };
  }

  handleChangePassword(): void {
    if (this.formChangePassword.invalid) {
      this.errorMessage = "Please fill out the form correctly.";
      return;
    }

    const oldPassword = this.formChangePassword.value.oldPassword;
    const newPassword = this.formChangePassword.value.newPassword;

  //   this.authService.changePassword(oldPassword, newPassword)
  //     .then(() => {
  //       //this.router.navigateByUrl("/login");
  //       alert(`Password changed successfully!`);
  //     })
  //     .catch(error => {
  //       this.errorMessage = error;
  //     });
  // }
}
}
