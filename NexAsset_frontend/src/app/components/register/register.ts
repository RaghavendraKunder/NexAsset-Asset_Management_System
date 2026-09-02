import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
    registerForm: FormGroup;

  hidePassword = true;
  hideConfirmPassword = true;

  isLoading = false;
  errorMessage = '';
  successMessage = '';

  private apiUrl = 'http://localhost:9091/api/auth';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
      this.registerForm = this.fb.group({
        firstName: ['',[Validators.required]],
        lastName: ['',[Validators.required]],
        email: ['',[Validators.required,Validators.email]],
        password: ['',[Validators.required,Validators.minLength(6)]],
        confirmPassword: ['',[Validators.required]]
      });
    }


  // ======================== REGISTER ======================================
  
  onRegister(): void {

  // Clear old messages
  this.errorMessage = '';
  this.successMessage = '';

  // Validate form
  if (this.registerForm.invalid) {
    this.registerForm.markAllAsTouched();

    this.showNotification(
      'Please fill in all required fields correctly.',
      'warning'
    );

    return;
  }

  const formData = this.registerForm.value;

  // Check password confirmation
  if (formData.password !== formData.confirmPassword) {

    this.showNotification(
      'Passwords do not match.',
      'error'
    );

    return;
  }

  this.isLoading = true;

  const registerData = {
    name: `${formData.firstName} ${formData.lastName}`.trim(),
    email: formData.email,
    password: formData.password,
    confirmPassword: formData.confirmPassword
  };

  console.log('Register data:', registerData);

  this.http
    .post<any>(
      `${this.apiUrl}/register`,
      registerData
    )
    .subscribe({

      // =====================================
      // SUCCESS - ACCOUNT CREATED
      // =====================================
      next: (response) => {

        console.log(
          'Registration successful:',
          response
        );

        this.isLoading = false;

        this.showNotification(
          'Account created successfully!',
          'success'
        );

        // Redirect to login
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },


      // =====================================
      // ERROR
      // =====================================
      error: (error) => {

        console.error(
          'Registration failed:',
          error
        );

        this.isLoading = false;


        // =====================================
        // ACCOUNT ALREADY EXISTS
        // =====================================
        if (error.status === 409) {

          this.showNotification(
            'An account with this email already exists.',
            'warning'
          );

        }


        // =====================================
        // BAD REQUEST / VALIDATION ERROR
        // =====================================
        else if (error.status === 400) {

          this.showNotification(
            error.error?.error ||
            error.error?.message ||
            'Invalid registration details.',
            'error'
          );

        }


        // =====================================
        // BACKEND NOT AVAILABLE
        // =====================================
        else if (error.status === 0) {

          this.showNotification(
            'Unable to connect to the server. Please make sure the backend is running.',
            'error'
          );

        }


        // =====================================
        // OTHER SERVER ERRORS
        // =====================================
        else {

          this.showNotification(
            error.error?.error ||
            error.error?.message ||
            'Registration failed. Please try again.',
            'error'
          );
        }
      }
    });
}
  //  ======================== NAVIGATE ======================================

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  //  ======================== REGISTER ======================================

  togglePassword(): void {
    this.hidePassword = !this.hidePassword;
  }

  toggleConfirmPassword(): void {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }

  //==========================NOTIFICATION=====================================
  private showNotification(
    message: string,
    type: 'success' | 'error' | 'warning'
    ): void {

      this.snackBar.open(message, 'Close', {
      duration: 4000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: [`notification-${type}`]
  });
}
}
