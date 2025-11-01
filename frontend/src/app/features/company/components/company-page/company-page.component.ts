import { Component, inject, signal, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CompanyService, CreateCompanyDTO, CompanyListDTO, ApiResponse } from '../../../../services/company.service';
import { AuthService } from '../../../../services/auth.service';

// Custom Validators
export class CustomValidators {
  static companyCode(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value === null || value === undefined || value === '') {
      return null; // Let required validator handle empty values
    }
    
    // Company code should be alphanumeric and 3-10 characters
    const codePattern = /^[A-Za-z0-9]{3,10}$/;
    if (!codePattern.test(value)) {
      return { companyCode: true };
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
export class CompanyPageComponent implements AfterViewInit {
  private readonly fb = inject(FormBuilder);
  private readonly companyService = inject(CompanyService);
  private readonly authService = inject(AuthService);

  @ViewChild('companiesGrid', { static: false }) companiesGridRef?: ElementRef;

  public readonly isSubmitting = signal(false);
  public readonly isLoadingCompanies = signal(false);
  public readonly successMessage = signal('');
  public readonly errorMessage = signal('');
  public readonly companies = signal<CompanyListDTO[]>([]);
  public readonly showCompaniesGrid = signal(false);

  public readonly companyForm: FormGroup = this.fb.group({
    customerCode: ['', [
      Validators.required,
      CustomValidators.companyCode
    ]],
    customerName: ['', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(255)
    ]],
    customerAddress: [''],
    currency: ['USD', [
      Validators.required,
      Validators.pattern(/^[A-Z]{3}$/)
    ]]
  });

  ngAfterViewInit(): void {
    // Component initialized
  }

  public onSubmit(): void {
    if (this.companyForm.valid && !this.isSubmitting()) {
      this.isSubmitting.set(true);
      this.successMessage.set('');
      this.errorMessage.set('');

      const companyData: CreateCompanyDTO = {
        customerCode: this.companyForm.value.customerCode.trim(),
        customerName: this.companyForm.value.customerName.trim(),
        customerAddress: this.companyForm.value.customerAddress?.trim() || '',
        currency: this.companyForm.value.currency || 'USD'
      };

      this.companyService.submitCompany(companyData).subscribe({
        next: (response: ApiResponse) => {
          this.isSubmitting.set(false);
          this.successMessage.set(`Company "${companyData.customerName}" (${companyData.customerCode}) has been successfully added!`);
          this.resetForm();
          
          // Show companies grid and refresh the list to include the new company
          this.showCompaniesGrid.set(true);
          this.loadCompanies(true); // Pass true to scroll after loading
          
          // Scroll to the success message first
          setTimeout(() => {
            this.scrollToSuccessMessage();
          }, 100);
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
    this.companyForm.reset({
      customerCode: '',
      customerName: '',
      customerAddress: '',
      currency: 'USD'
    });
    this.successMessage.set('');
    this.errorMessage.set('');
  }

  public viewCompanies(): void {
    console.log('viewCompanies() called');
    this.showCompaniesGrid.set(true);
    this.loadCompanies(true); // Pass true to scroll after loading
  }

  private scrollToCompaniesGrid(): void {
    console.log('scrollToCompaniesGrid() called');
    console.log('showCompaniesGrid signal value:', this.showCompaniesGrid());
    
    // Try ViewChild first, then fallback to getElementById
    let element: HTMLElement | null = null;
    
    if (this.companiesGridRef?.nativeElement) {
      element = this.companiesGridRef.nativeElement;
      console.log('Using ViewChild reference for scrolling');
    } else {
      element = document.getElementById('companies-grid');
      console.log('Using getElementById for scrolling, element found:', !!element);
    }
    
    if (element) {
      console.log('Scrolling to companies grid - element dimensions:', {
        height: element.offsetHeight,
        width: element.offsetWidth,
        top: element.offsetTop
      });
      
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start',
        inline: 'nearest'
      });
      
      // Also try alternative scrolling method as fallback
      setTimeout(() => {
        element!.scrollIntoView({ 
          behavior: 'auto', 
          block: 'start'
        });
      }, 1000);
    } else {
      console.warn('Companies grid element not found, attempting fallback');
      
      // Try multiple fallback attempts
      let attempts = 0;
      const maxAttempts = 5;
      
      const tryFallback = () => {
        attempts++;
        const fallbackElement = document.getElementById('companies-grid');
        
        if (fallbackElement) {
          console.log(`Fallback scroll attempt ${attempts} successful`);
          fallbackElement.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start',
            inline: 'nearest'
          });
        } else if (attempts < maxAttempts) {
          console.log(`Fallback attempt ${attempts}/${maxAttempts} failed, retrying...`);
          setTimeout(tryFallback, 300);
        } else {
          console.error('All fallback attempts failed - companies grid element not found');
        }
      };
      
      setTimeout(tryFallback, 200);
    }
  }

  private scrollToSuccessMessage(): void {
    const successMessage = document.querySelector('.success-message');
    if (successMessage) {
      successMessage.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center',
        inline: 'nearest'
      });
    }
  }

  public hideCompaniesGrid(): void {
    this.showCompaniesGrid.set(false);
    this.companies.set([]);
  }

  private loadCompanies(shouldScrollAfterLoad: boolean = false): void {
    this.isLoadingCompanies.set(true);
    this.errorMessage.set('');

    this.companyService.getCompanies().subscribe({
      next: (companies: CompanyListDTO[]) => {
        this.isLoadingCompanies.set(false);
        this.companies.set(companies);
        
        // If we should scroll after loading, do it with a delay to ensure DOM update
        if (shouldScrollAfterLoad) {
          setTimeout(() => {
            console.log('Scrolling after companies loaded');
            this.scrollToCompaniesGrid();
          }, 300);
        }
      },
      error: (error: any) => {
        this.isLoadingCompanies.set(false);
        this.errorMessage.set(
          error.error?.message || 
          'Failed to load companies. Please try again.'
        );
        console.error('Error loading companies:', error);
      }
    });
  }

  public importCompanies(): void {
    console.log('Import companies clicked');
    // TODO: Implement import functionality
  }

  public exportCompanies(): void {
    console.log('Export companies clicked');
    // TODO: Implement export functionality
  }


}