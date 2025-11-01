import { Component, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  signupForm: FormGroup;
  forgotPasswordForm: FormGroup;
  resetPasswordForm: FormGroup;
  
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  currentView: 'login' | 'signup' | 'forgot-password' | 'reset-password' = 'login';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.signupForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      firstName: [''],
      lastName: [''],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    });

    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });

    this.resetPasswordForm = this.formBuilder.group({
      resetCode: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      this.successMessage = '';

      const { username, password } = this.loginForm.value;

      this.authService.login(username, password).subscribe({
        next: (response: any) => {
          this.isLoading = false;
          if (response.success) {
            this.router.navigate(['/dashboard/home']);
          } else {
            this.errorMessage = 'Invalid user credentials. Please check your username and password.';
          }
        },
        error: (error: any) => {
          this.isLoading = false;
          this.errorMessage = error.error?.message || 'Invalid user credentials. Please check your username and password.';
        }
      });
    }
  }

  onSignup() {
    if (this.signupForm.valid) {
      const { password, confirmPassword } = this.signupForm.value;
      
      if (password !== confirmPassword) {
        this.errorMessage = 'Passwords do not match.';
        return;
      }

      this.isLoading = true;
      this.errorMessage = '';
      this.successMessage = '';

      const { username, email, firstName, lastName } = this.signupForm.value;

      this.authService.signup(username, email, password, firstName, lastName).subscribe({
        next: (response: any) => {
          this.isLoading = false;
          if (response.success) {
            this.successMessage = 'Account created successfully! Please login with your credentials.';
            this.switchToLogin();
            this.signupForm.reset();
          } else {
            this.errorMessage = response.message || 'Signup failed. Please try again.';
          }
        },
        error: (error: any) => {
          this.isLoading = false;
          this.errorMessage = error.error?.message || 'Signup failed. Please try again.';
        }
      });
    }
  }

  onForgotPassword() {
    if (this.forgotPasswordForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      this.successMessage = '';

      const { email } = this.forgotPasswordForm.value;

      this.authService.forgotPassword(email).subscribe({
        next: (response: any) => {
          this.isLoading = false;
          console.log('Forgot password response:', response);
          if (response.success) {
            this.successMessage = 'Password reset code has been sent to your email. Redirecting to reset password page...';
            this.forgotPasswordForm.reset();
            // Redirect to reset password page after 1.5 seconds
            console.log('Setting timeout for redirect...');
            setTimeout(() => {
              console.log('Timeout executed, switching to reset password');
              this.clearMessages();
              this.switchToResetPassword();
            }, 1500);
          } else {
            this.errorMessage = response.message || 'Failed to send reset code.';
          }
        },
        error: (error: any) => {
          this.isLoading = false;
          this.errorMessage = error.error?.message || 'Failed to send reset code.';
        }
      });
    }
  }

  switchToSignup() {
    this.currentView = 'signup';
    this.clearMessages();
  }

  switchToLogin() {
    this.currentView = 'login';
    this.clearMessages();
  }

  switchToForgotPassword() {
    this.currentView = 'forgot-password';
    this.clearMessages();
  }

  switchToResetPassword() {
    console.log('switchToResetPassword called, changing view to reset-password');
    this.currentView = 'reset-password';
    console.log('currentView after change:', this.currentView);
    this.clearMessages();
    // Force change detection to ensure the view updates
    this.cdr.detectChanges();
    console.log('Change detection triggered');
  }

  onResetPassword() {
    if (this.resetPasswordForm.valid) {
      const { newPassword, confirmPassword } = this.resetPasswordForm.value;
      
      if (newPassword !== confirmPassword) {
        this.errorMessage = 'Passwords do not match.';
        return;
      }

      this.isLoading = true;
      this.errorMessage = '';
      this.successMessage = '';

      const { resetCode } = this.resetPasswordForm.value;

      this.authService.resetPassword(resetCode, newPassword).subscribe({
        next: (response: any) => {
          this.isLoading = false;
          if (response.success) {
            this.successMessage = 'Password reset successfully! Please login with your new password.';
            this.resetPasswordForm.reset();
            // Redirect to login after 3 seconds
            setTimeout(() => {
              this.switchToLogin();
            }, 3000);
          } else {
            this.errorMessage = response.message || 'Failed to reset password. Please check your reset code.';
          }
        },
        error: (error: any) => {
          this.isLoading = false;
          this.errorMessage = error.error?.message || 'Failed to reset password. Please check your reset code.';
        }
      });
    }
  }

  private clearMessages() {
    this.errorMessage = '';
    this.successMessage = '';
  }
}