import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CompanyService } from '../../../../services/company.service';

export interface Company {
  id: number;
  name: string;
}

export interface CompanyApiResponse {
  success: boolean;
  message: string;
  data?: Company;
}

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
  templateUrl: './company-page.component.html',
  styleUrls: ['./company-page.component.css']
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
        next: (response: any) => {
          this.isSubmitting.set(false);
          this.successMessage.set(`Company "${companyData.name}" (${companyData.id}) has been successfully added!`);
          this.resetForm();
        },
        error: (error: any) => {
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