import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, LoginRequest } from './services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="login-container">
      <div class="login-card">
        <div class="login-header">
          <h1>Stock Management System</h1>
          <h2>Sign In</h2>
        </div>

        <form (ngSubmit)="onLogin()" #loginForm="ngForm">
          <div class="form-group">
            <label for="username">Username or Email</label>
            <input
              type="text"
              id="username"
              name="username"
              [(ngModel)]="loginData.username"
              required
              class="form-control"
              placeholder="Enter your username or email"
              [class.error]="showError && !loginData.username"
            />
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              [(ngModel)]="loginData.password"
              required
              class="form-control"
              placeholder="Enter your password"
              [class.error]="showError && !loginData.password"
            />
          </div>

          <div class="error-message" *ngIf="errorMessage">
            {{ errorMessage }}
          </div>

          <button
            type="submit"
            class="btn-primary"
            [disabled]="isLoading || !loginForm.valid"
          >
            <span *ngIf="isLoading" class="spinner"></span>
            {{ isLoading ? 'Signing In...' : 'Sign In' }}
          </button>
        </form>

        <div class="login-footer">
          <button type="button" class="btn-link" (click)="onForgotPassword()">
            Forgot Password?
          </button>
          <button type="button" class="btn-secondary" (click)="onSignup()">
            Create New Account
          </button>
        </div>
      </div>
    </div>

    <!-- Forgot Password Modal -->
    <div class="modal-overlay" *ngIf="showForgotPasswordModal" (click)="closeForgotPasswordModal()">
      <div class="modal-content" (click)="$event.stopPropagation()">
        <div class="modal-header">
          <h3>Reset Password</h3>
          <button type="button" class="btn-close" (click)="closeForgotPasswordModal()">&times;</button>
        </div>
        <form (ngSubmit)="onSubmitForgotPassword()" #forgotForm="ngForm">
          <div class="form-group">
            <label for="resetEmail">Email Address</label>
            <input
              type="email"
              id="resetEmail"
              name="resetEmail"
              [(ngModel)]="forgotPasswordEmail"
              required
              email
              class="form-control"
              placeholder="Enter your email address"
            />
          </div>
          <div class="success-message" *ngIf="forgotPasswordMessage">
            {{ forgotPasswordMessage }}
          </div>
          <div class="modal-footer">
            <button type="button" class="btn-secondary" (click)="closeForgotPasswordModal()">
              Cancel
            </button>
            <button
              type="submit"
              class="btn-primary"
              [disabled]="!forgotForm.valid || isForgotPasswordLoading"
            >
              {{ isForgotPasswordLoading ? 'Sending...' : 'Send Reset Link' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Signup Modal -->
    <div class="modal-overlay" *ngIf="showSignupModal" (click)="closeSignupModal()">
      <div class="modal-content" (click)="$event.stopPropagation()">
        <div class="modal-header">
          <h3>Create New Account</h3>
          <button type="button" class="btn-close" (click)="closeSignupModal()">&times;</button>
        </div>
        <form (ngSubmit)="onSubmitSignup()" #signupForm="ngForm">
          <div class="form-row">
            <div class="form-group">
              <label for="signupFirstName">First Name</label>
              <input
                type="text"
                id="signupFirstName"
                name="signupFirstName"
                [(ngModel)]="signupData.firstName"
                required
                class="form-control"
                placeholder="First Name"
              />
            </div>
            <div class="form-group">
              <label for="signupLastName">Last Name</label>
              <input
                type="text"
                id="signupLastName"
                name="signupLastName"
                [(ngModel)]="signupData.lastName"
                required
                class="form-control"
                placeholder="Last Name"
              />
            </div>
          </div>
          <div class="form-group">
            <label for="signupUsername">Username</label>
            <input
              type="text"
              id="signupUsername"
              name="signupUsername"
              [(ngModel)]="signupData.username"
              required
              class="form-control"
              placeholder="Choose a username"
            />
          </div>
          <div class="form-group">
            <label for="signupEmail">Email Address</label>
            <input
              type="email"
              id="signupEmail"
              name="signupEmail"
              [(ngModel)]="signupData.email"
              required
              email
              class="form-control"
              placeholder="Enter your email"
            />
          </div>
          <div class="form-group">
            <label for="signupPassword">Password</label>
            <input
              type="password"
              id="signupPassword"
              name="signupPassword"
              [(ngModel)]="signupData.password"
              required
              minlength="6"
              class="form-control"
              placeholder="Create a password (min 6 characters)"
            />
          </div>
          <div class="error-message" *ngIf="signupErrorMessage">
            {{ signupErrorMessage }}
          </div>
          <div class="success-message" *ngIf="signupSuccessMessage">
            {{ signupSuccessMessage }}
          </div>
          <div class="modal-footer">
            <button type="button" class="btn-secondary" (click)="closeSignupModal()">
              Cancel
            </button>
            <button
              type="submit"
              class="btn-primary"
              [disabled]="!signupForm.valid || isSignupLoading"
            >
              {{ isSignupLoading ? 'Creating Account...' : 'Create Account' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 20px;
    }

    .login-card {
      background: white;
      border-radius: 10px;
      padding: 40px;
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
      width: 100%;
      max-width: 400px;
    }

    .login-header {
      text-align: center;
      margin-bottom: 30px;
    }

    .login-header h1 {
      color: #333;
      margin: 0 0 10px 0;
      font-size: 24px;
      font-weight: 600;
    }

    .login-header h2 {
      color: #666;
      margin: 0;
      font-size: 18px;
      font-weight: 400;
    }

    .form-group {
      margin-bottom: 20px;
    }

    .form-row {
      display: flex;
      gap: 15px;
    }

    .form-row .form-group {
      flex: 1;
    }

    label {
      display: block;
      margin-bottom: 5px;
      color: #333;
      font-weight: 500;
    }

    .form-control {
      width: 100%;
      padding: 12px;
      border: 2px solid #e1e5e9;
      border-radius: 6px;
      font-size: 14px;
      transition: border-color 0.3s ease;
      box-sizing: border-box;
    }

    .form-control:focus {
      outline: none;
      border-color: #667eea;
    }

    .form-control.error {
      border-color: #e74c3c;
    }

    .btn-primary {
      width: 100%;
      padding: 12px;
      background: #667eea;
      color: white;
      border: none;
      border-radius: 6px;
      font-size: 16px;
      font-weight: 500;
      cursor: pointer;
      transition: background 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }

    .btn-primary:hover:not(:disabled) {
      background: #5a6fd8;
    }

    .btn-primary:disabled {
      background: #bdc3c7;
      cursor: not-allowed;
    }

    .btn-secondary {
      padding: 10px 20px;
      background: #95a5a6;
      color: white;
      border: none;
      border-radius: 6px;
      font-size: 14px;
      cursor: pointer;
      transition: background 0.3s ease;
    }

    .btn-secondary:hover {
      background: #7f8c8d;
    }

    .btn-link {
      background: none;
      border: none;
      color: #667eea;
      text-decoration: underline;
      cursor: pointer;
      font-size: 14px;
    }

    .btn-link:hover {
      color: #5a6fd8;
    }

    .login-footer {
      margin-top: 30px;
      text-align: center;
      display: flex;
      flex-direction: column;
      gap: 15px;
    }

    .error-message {
      color: #e74c3c;
      font-size: 14px;
      margin-bottom: 15px;
      padding: 10px;
      background: #fdf2f2;
      border: 1px solid #fecaca;
      border-radius: 6px;
    }

    .success-message {
      color: #27ae60;
      font-size: 14px;
      margin-bottom: 15px;
      padding: 10px;
      background: #f0f9f0;
      border: 1px solid #a7f3d0;
      border-radius: 6px;
    }

    .spinner {
      width: 16px;
      height: 16px;
      border: 2px solid #ffffff;
      border-top: 2px solid transparent;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      padding: 20px;
    }

    .modal-content {
      background: white;
      border-radius: 10px;
      padding: 30px;
      width: 100%;
      max-width: 500px;
      max-height: 90vh;
      overflow-y: auto;
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      padding-bottom: 15px;
      border-bottom: 1px solid #e1e5e9;
    }

    .modal-header h3 {
      margin: 0;
      color: #333;
    }

    .btn-close {
      background: none;
      border: none;
      font-size: 24px;
      cursor: pointer;
      color: #666;
      padding: 0;
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .btn-close:hover {
      color: #333;
    }

    .modal-footer {
      display: flex;
      gap: 15px;
      justify-content: flex-end;
      margin-top: 20px;
      padding-top: 15px;
      border-top: 1px solid #e1e5e9;
    }
  `]
})
export class LoginComponent {
  loginData: LoginRequest = {
    username: '',
    password: ''
  };

  signupData = {
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  };

  forgotPasswordEmail: string = '';
  errorMessage: string = '';
  signupErrorMessage: string = '';
  signupSuccessMessage: string = '';
  forgotPasswordMessage: string = '';
  isLoading: boolean = false;
  isSignupLoading: boolean = false;
  isForgotPasswordLoading: boolean = false;
  showError: boolean = false;
  showSignupModal: boolean = false;
  showForgotPasswordModal: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onLogin(): void {
    if (!this.loginData.username || !this.loginData.password) {
      this.showError = true;
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.showError = false;

    this.authService.login(this.loginData).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.success) {
          this.router.navigate(['/dashboard']);
        } else {
          this.errorMessage = response.message;
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.error?.message || 'Login failed. Please try again.';
      }
    });
  }

  onSignup(): void {
    this.showSignupModal = true;
    this.signupErrorMessage = '';
    this.signupSuccessMessage = '';
  }

  closeSignupModal(): void {
    this.showSignupModal = false;
    this.signupData = {
      username: '',
      email: '',
      password: '',
      firstName: '',
      lastName: ''
    };
    this.signupErrorMessage = '';
    this.signupSuccessMessage = '';
  }

  onSubmitSignup(): void {
    this.isSignupLoading = true;
    this.signupErrorMessage = '';
    this.signupSuccessMessage = '';

    this.authService.signup(this.signupData).subscribe({
      next: (response) => {
        this.isSignupLoading = false;
        if (response.success) {
          this.signupSuccessMessage = 'Account created successfully! You can now sign in.';
          setTimeout(() => {
            this.closeSignupModal();
          }, 2000);
        } else {
          this.signupErrorMessage = response.message;
        }
      },
      error: (error) => {
        this.isSignupLoading = false;
        this.signupErrorMessage = error.error?.message || 'Signup failed. Please try again.';
      }
    });
  }

  onForgotPassword(): void {
    this.showForgotPasswordModal = true;
    this.forgotPasswordEmail = '';
    this.forgotPasswordMessage = '';
  }

  closeForgotPasswordModal(): void {
    this.showForgotPasswordModal = false;
    this.forgotPasswordEmail = '';
    this.forgotPasswordMessage = '';
  }

  onSubmitForgotPassword(): void {
    this.isForgotPasswordLoading = true;
    this.forgotPasswordMessage = '';

    this.authService.forgotPassword(this.forgotPasswordEmail).subscribe({
      next: (response) => {
        this.isForgotPasswordLoading = false;
        this.forgotPasswordMessage = response.message;
        if (response.success) {
          setTimeout(() => {
            this.closeForgotPasswordModal();
          }, 3000);
        }
      },
      error: (error) => {
        this.isForgotPasswordLoading = false;
        this.forgotPasswordMessage = error.error?.message || 'Failed to send reset email.';
      }
    });
  }
}