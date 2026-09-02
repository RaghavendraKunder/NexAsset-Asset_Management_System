import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import {Auth, LoginRequest, LoginResponse} from '../../services/auth';
@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  loginForm: FormGroup;
  hidePassword = true;
  isLoading = false;

  constructor(
     private fb: FormBuilder,
    private router: Router,
    private authService: Auth,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

    onLogin(): void {

    // -------------------------------------------------------
    // Check form validation
    // -------------------------------------------------------

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.showNotification('Please enter a valid email and password.','warning');
      return;
    }
    // -------------------------------------------------------
    // Prevent multiple login requests
    // -------------------------------------------------------
    if (this.isLoading) {
      return;
    }
    this.isLoading = true;
    // -------------------------------------------------------
    // Get form data
    // -------------------------------------------------------
    const loginData: LoginRequest = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
      rememberMe: this.loginForm.value.rememberMe
    };
    // -------------------------------------------------------
    // Call backend login API
    // -------------------------------------------------------
    this.authService.login(loginData).subscribe({
      // =====================================================
      // SUCCESS
      // =====================================================
      next: (response: LoginResponse) => {
        console.log('Login successful:', response);
        this.isLoading = false;
        this.showNotification(
          `Welcome back, ${response.name}!`,
          'success'
        );
        // ---------------------------------------------------
        // Navigate to dashboard
        // ---------------------------------------------------

        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 800);
      },


      // =====================================================
      // ERROR
      // =====================================================

      error: (error) => {

        console.error('Login error:', error);

        this.isLoading = false;


        // ---------------------------------------------------
        // Invalid credentials
        // ---------------------------------------------------

        if (
          error.status === 401 ||
          error.status === 403
        ) {

          this.showNotification(
            'Invalid email or password.',
            'error'
          );

          return;
        }


        // ---------------------------------------------------
        // Validation error
        // ---------------------------------------------------

        if (error.status === 400) {

          const message =
            error.error?.error ||
            error.error?.message ||
            'Invalid login details.';

          this.showNotification(
            message,
            'error'
          );

          return;
        }


        // ---------------------------------------------------
        // Backend unavailable
        // ---------------------------------------------------

        if (error.status === 0) {

          this.showNotification(
            'Unable to connect to the server. Please try again.',
            'error'
          );

          return;
        }


        // ---------------------------------------------------
        // Other errors
        // ---------------------------------------------------

        this.showNotification(
          'Something went wrong. Please try again.',
          'error'
        );
      }
    });
  }


  // =========================================================
  // NOTIFICATION
  // =========================================================

  private showNotification(
    message: string,
    type: 'success' | 'error' | 'warning'
  ): void {

    this.snackBar.open(
      message,
      'Close',
      {
        duration: 4000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: [`notification-${type}`]
      }
    );
  }

  goToRegister(): void {
    this.router.navigate(['/register']);

  }

  forgotPassword(): void {
    console.log('Forgot password clicked');

  }
}