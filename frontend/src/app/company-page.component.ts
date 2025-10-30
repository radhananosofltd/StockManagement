import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CompanyService, Company, CompanyApiResponse } from './services';

// Custom Validators
export class CustomValidators {
  static positiveInteger(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value === null || value === undefined || value === '') {
      return null; // Let required validator handle empty values
    }
    
    const numValue = Number(value);
    if (isNaN(numValue) || !Number.isInteger(numValue) || numValue <= 0) {
      return { positiveInteger: true };
    }
    
    return null;
  }
}

@Component({
  selector: 'app-company-page',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  template: `
    <div class="company-page">
      <div class="page-header">
        <h2>Company Management</h2>
        <p>Add and manage companies in your stock portfolio</p>
      </div>

      <div class="company-form-container">
        <form [formGroup]="companyForm" (ngSubmit)="onSubmit()" class="company-form">
          <div class="form-row">
            <div class="form-group">
              <label for="companyId">Company ID</label>
              <input
                id="companyId"
                type="number"
                min="1"
                step="1"
                formControlName="id"
                placeholder="Enter company ID (e.g., 1001, 2500, 9999)"
                [class.error]="companyForm.get('id')?.invalid && companyForm.get('id')?.touched"
                (keypress)="onNumberKeyPress($event)"
              />
              @if (companyForm.get('id')?.invalid && companyForm.get('id')?.touched) {
                <div class="error-message">
                  @if (companyForm.get('id')?.errors?.['required']) {
                    Company ID is required
                  }
                  @if (companyForm.get('id')?.errors?.['positiveInteger']) {
                    Company ID must be a positive integer number
                  }
                </div>
              }
            </div>

            <div class="form-group">
              <label for="companyName">Company Name</label>
              <input
                id="companyName"
                type="text"
                formControlName="name"
                placeholder="Enter company name (e.g., Apple Inc.)"
                [class.error]="companyForm.get('name')?.invalid && companyForm.get('name')?.touched"
              />
              @if (companyForm.get('name')?.invalid && companyForm.get('name')?.touched) {
                <div class="error-message">
                  @if (companyForm.get('name')?.errors?.['required']) {
                    Company name is required
                  }
                  @if (companyForm.get('name')?.errors?.['minlength']) {
                    Company name must be at least 2 characters
                  }
                </div>
              }
            </div>
          </div>

          <div class="form-actions">
            <button
              type="submit"
              [disabled]="companyForm.invalid || isSubmitting()"
              class="submit-btn"
            >
              @if (isSubmitting()) {
                <span class="spinner"></span>
                Submitting...
              } @else {
                <svg class="btn-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                </svg>
                Add Company
              }
            </button>

            <button
              type="button"
              (click)="resetForm()"
              class="reset-btn"
              [disabled]="isSubmitting()"
            >
              <svg class="btn-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
              </svg>
              Reset
            </button>
          </div>
        </form>

        @if (successMessage()) {
          <div class="success-message">
            <div class="message-content">
              <svg class="success-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              {{ successMessage() }}
            </div>
          </div>
        }

        @if (errorMessage()) {
          <div class="error-message-box">
            <div class="message-content">
              <svg class="error-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
              </svg>
              {{ errorMessage() }}
            </div>
          </div>
        }
      </div>

      <!-- Quick Actions Card -->
      <div class="quick-actions-card">
        <h3>Quick Actions</h3>
        <div class="actions-grid">
          <button class="action-btn" (click)="viewCompanies()">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
            </svg>
            <span>View All Companies</span>
          </button>
          <button class="action-btn" (click)="importCompanies()">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z"/>
            </svg>
            <span>Import Companies</span>
          </button>
          <button class="action-btn" (click)="exportCompanies()">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 10h6v6h4l-7 7-7-7h4zm-4-4h14v2H5z"/>
            </svg>
            <span>Export Data</span>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .company-page {
      max-width: 1200px;
      margin: 0 auto;
    }

    .page-header {
      margin-bottom: 2rem;
    }

    .page-header h2 {
      font-size: 2rem;
      font-weight: 700;
      color: #1a202c;
      margin: 0 0 0.5rem 0;
    }

    .page-header p {
      color: #64748b;
      margin: 0;
      font-size: 1.1rem;
    }

    .company-form-container {
      background: white;
      border-radius: 16px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      padding: 2.5rem;
      margin-bottom: 2rem;
    }

    .company-form {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .form-group label {
      font-weight: 600;
      color: #374151;
      font-size: 0.875rem;
      letter-spacing: 0.025em;
    }

    .form-group input {
      padding: 1rem;
      border: 2px solid #e2e8f0;
      border-radius: 12px;
      font-size: 1rem;
      transition: all 0.2s ease;
      background: #f8fafc;
      color: #1a202c;
    }

    .form-group input[type="number"] {
      -moz-appearance: textfield;
    }

    .form-group input[type="number"]::-webkit-outer-spin-button,
    .form-group input[type="number"]::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    .form-group input::placeholder {
      color: #94a3b8;
    }

    .form-group input:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
      background: white;
    }

    .form-group input.error {
      border-color: #ef4444;
      box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.1);
      background: #fef2f2;
    }

    .error-message {
      color: #ef4444;
      font-size: 0.875rem;
      font-weight: 500;
      margin-top: 0.25rem;
    }

    .form-actions {
      display: flex;
      gap: 1rem;
      justify-content: flex-start;
    }

    .submit-btn, .reset-btn {
      padding: 1rem 2rem;
      border-radius: 12px;
      font-weight: 600;
      font-size: 1rem;
      transition: all 0.2s ease;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      border: none;
      min-width: 140px;
    }

    .submit-btn {
      background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
      color: white;
      box-shadow: 0 4px 14px 0 rgba(59, 130, 246, 0.4);
    }

    .submit-btn:hover:not(:disabled) {
      background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
      box-shadow: 0 6px 20px 0 rgba(59, 130, 246, 0.6);
      transform: translateY(-2px);
    }

    .submit-btn:disabled {
      background: #9ca3af;
      cursor: not-allowed;
      box-shadow: none;
      transform: none;
    }

    .reset-btn {
      background: #f1f5f9;
      color: #475569;
      border: 2px solid #e2e8f0;
    }

    .reset-btn:hover:not(:disabled) {
      background: #e2e8f0;
      transform: translateY(-1px);
    }

    .reset-btn:disabled {
      background: #f8fafc;
      color: #94a3b8;
      cursor: not-allowed;
      transform: none;
    }

    .btn-icon {
      width: 1.25rem;
      height: 1.25rem;
    }

    .spinner {
      width: 1.25rem;
      height: 1.25rem;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-top: 2px solid #ffffff;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .success-message, .error-message-box {
      margin-top: 2rem;
      padding: 1.25rem;
      border-radius: 12px;
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
      font-weight: 500;
      line-height: 1.5;
    }

    .success-message {
      background: linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 100%);
      border: 2px solid #bbf7d0;
      color: #065f46;
    }

    .error-message-box {
      background: linear-gradient(135deg, #fef2f2 0%, #fef7f7 100%);
      border: 2px solid #fecaca;
      color: #991b1b;
    }

    .message-content {
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
      width: 100%;
    }

    .success-icon, .error-icon {
      width: 1.5rem;
      height: 1.5rem;
      flex-shrink: 0;
      margin-top: 0.125rem;
    }

    .quick-actions-card {
      background: white;
      border-radius: 16px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      padding: 2rem;
    }

    .quick-actions-card h3 {
      font-size: 1.25rem;
      font-weight: 600;
      color: #1a202c;
      margin: 0 0 1.5rem 0;
    }

    .actions-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
    }

    .action-btn {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 1rem 1.5rem;
      background: #f8fafc;
      border: 2px solid #e2e8f0;
      border-radius: 12px;
      color: #475569;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .action-btn:hover {
      background: #e2e8f0;
      border-color: #cbd5e1;
      transform: translateY(-1px);
    }

    .action-btn svg {
      width: 1.25rem;
      height: 1.25rem;
      color: #64748b;
    }

    @media (max-width: 768px) {
      .company-form-container {
        padding: 2rem;
      }

      .form-row {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }

      .form-actions {
        flex-direction: column;
        align-items: stretch;
      }

      .submit-btn, .reset-btn {
        min-width: auto;
      }
    }

    @media (max-width: 640px) {
      .company-form-container {
        padding: 1.5rem;
      }

      .quick-actions-card {
        padding: 1.5rem;
      }

      .actions-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class CompanyPageComponent {
  private readonly fb = inject(FormBuilder);
  private readonly companyService = inject(CompanyService);

  public readonly isSubmitting = signal(false);
  public readonly successMessage = signal('');
  public readonly errorMessage = signal('');

  public readonly companyForm: FormGroup = this.fb.group({
    id: ['', [
      Validators.required,
      CustomValidators.positiveInteger
    ]],
    name: ['', [
      Validators.required,
      Validators.minLength(2)
    ]]
  });

  public onSubmit(): void {
    if (this.companyForm.valid && !this.isSubmitting()) {
      this.isSubmitting.set(true);
      this.successMessage.set('');
      this.errorMessage.set('');

      const companyData: Company = {
        id: parseInt(this.companyForm.value.id, 10),
        name: this.companyForm.value.name.trim()
      };

      this.companyService.submitCompany(companyData).subscribe({
        next: (response) => {
          this.isSubmitting.set(false);
          this.successMessage.set(`Company "${companyData.name}" (${companyData.id}) has been successfully added!`);
          this.resetForm();
        },
        error: (error) => {
          this.isSubmitting.set(false);
          this.errorMessage.set(
            error.error?.message || 
            'Failed to submit company data. Please check your connection and try again.'
          );
          console.error('Error submitting company:', error);
        }
      });
    } else {
      Object.keys(this.companyForm.controls).forEach(key => {
        this.companyForm.get(key)?.markAsTouched();
      });
    }
  }

  public resetForm(): void {
    this.companyForm.reset();
    this.successMessage.set('');
    this.errorMessage.set('');
  }

  public viewCompanies(): void {
    console.log('View all companies clicked');
    // TODO: Navigate to companies list view
  }

  public importCompanies(): void {
    console.log('Import companies clicked');
    // TODO: Implement import functionality
  }

  public exportCompanies(): void {
    console.log('Export companies clicked');
    // TODO: Implement export functionality
  }

  public onNumberKeyPress(event: KeyboardEvent): void {
    // Allow: backspace, delete, tab, escape, enter
    if ([46, 8, 9, 27, 13].indexOf(event.keyCode) !== -1 ||
        // Allow: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
        (event.keyCode === 65 && event.ctrlKey === true) ||
        (event.keyCode === 67 && event.ctrlKey === true) ||
        (event.keyCode === 86 && event.ctrlKey === true) ||
        (event.keyCode === 88 && event.ctrlKey === true)) {
      return;
    }
    // Ensure that it is a number and stop the keypress if not
    if ((event.shiftKey || (event.keyCode < 48 || event.keyCode > 57)) && (event.keyCode < 96 || event.keyCode > 105)) {
      event.preventDefault();
    }
  }
}