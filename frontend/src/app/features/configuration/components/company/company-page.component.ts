import { Component, inject, signal, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CompanyService, CreateCompanyDTO, CompanyListDTO, ApiResponse, BulkImportResponse } from '../../../../services/company.service';
import { AuthService } from '../../../../services/auth.service';
import * as XLSX from 'xlsx';

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
  public readonly isImporting = signal(false);
  public readonly successMessage = signal('');
  public readonly errorMessage = signal('');
  public readonly importMessage = signal('');
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
    this.importMessage.set('');
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
    // Create hidden file input
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.xlsx,.xls';
    fileInput.style.display = 'none';

    fileInput.onchange = (event: any) => {
      const file = event.target.files[0];
      if (file) {
        this.processExcelFile(file);
      }
    };

    document.body.appendChild(fileInput);
    fileInput.click();
    document.body.removeChild(fileInput);
  }

  private processExcelFile(file: File): void {
    this.isImporting.set(true);
    this.importMessage.set('Processing Excel file...');
    this.errorMessage.set('');

    const reader = new FileReader();
    
    reader.onload = (e: any) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        
        // Get the first worksheet
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        
        // Convert to JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        
        this.validateAndImportData(jsonData as any[][]);
      } catch (error) {
        this.isImporting.set(false);
        this.errorMessage.set('Failed to read Excel file. Please ensure it is a valid Excel file.');
        console.error('Excel processing error:', error);
      }
    };

    reader.onerror = () => {
      this.isImporting.set(false);
      this.errorMessage.set('Failed to read the selected file.');
    };

    reader.readAsArrayBuffer(file);
  }

  private validateAndImportData(data: any[][]): void {
    if (data.length < 2) {
      this.isImporting.set(false);
      this.errorMessage.set('Excel file must contain at least one header row and one data row.');
      return;
    }

    const headers = data[0];
    const dataRows = data.slice(1);

    // Validate headers - must contain exactly 4 columns
    if (headers.length !== 4) {
      this.isImporting.set(false);
      this.errorMessage.set('Excel file must contain exactly 4 columns: Company Code, Company Name, Company Address, Currency Value.');
      return;
    }

    // Expected header names (case-insensitive)
    const expectedHeaders = ['company code', 'company name', 'company address', 'currency value'];
    const actualHeaders = headers.map((h: string) => h.toString().toLowerCase().trim());

    const headersMatch = expectedHeaders.every((expected, index) => 
      actualHeaders[index] === expected
    );

    if (!headersMatch) {
      this.isImporting.set(false);
      this.errorMessage.set(
        `Invalid column headers. Expected: "Company Code", "Company Name", "Company Address", "Currency Value". ` +
        `Found: ${headers.join(', ')}`
      );
      return;
    }

    // Validate that there's at least one data row
    if (dataRows.length === 0) {
      this.isImporting.set(false);
      this.errorMessage.set('Excel file must contain at least one data row.');
      return;
    }

    // Convert data rows to company DTOs
    const companies: CreateCompanyDTO[] = [];
    const errors: string[] = [];

    dataRows.forEach((row, index) => {
      const rowNumber = index + 2; // +2 because index starts at 0 and we skip header row

      if (row.length < 4) {
        errors.push(`Row ${rowNumber}: Missing required columns.`);
        return;
      }

      const [companyCode, companyName, companyAddress, currencyValue] = row;

      // Validate required fields
      if (!companyCode || companyCode.toString().trim() === '') {
        errors.push(`Row ${rowNumber}: Company Code is required.`);
        return;
      }

      if (!companyName || companyName.toString().trim() === '') {
        errors.push(`Row ${rowNumber}: Company Name is required.`);
        return;
      }

      if (!currencyValue || currencyValue.toString().trim() === '') {
        errors.push(`Row ${rowNumber}: Currency Value is required.`);
        return;
      }

      // Validate company code format
      const codePattern = /^[A-Za-z0-9]{3,10}$/;
      const code = companyCode.toString().trim();
      if (!codePattern.test(code)) {
        errors.push(`Row ${rowNumber}: Company Code must be 3-10 alphanumeric characters.`);
        return;
      }

      // Validate currency format (should be 3-letter currency code)
      const currencyPattern = /^[A-Z]{3}$/;
      const currency = currencyValue.toString().trim().toUpperCase();
      if (!currencyPattern.test(currency)) {
        errors.push(`Row ${rowNumber}: Currency Value must be a 3-letter currency code (e.g., USD, EUR).`);
        return;
      }

      companies.push({
        customerCode: code,
        customerName: companyName.toString().trim(),
        customerAddress: companyAddress ? companyAddress.toString().trim() : '',
        currency: currency
      });
    });

    if (errors.length > 0) {
      this.isImporting.set(false);
      this.errorMessage.set(`Validation errors found:\n${errors.join('\n')}`);
      return;
    }

    if (companies.length === 0) {
      this.isImporting.set(false);
      this.errorMessage.set('No valid company records found in the Excel file.');
      return;
    }

    // Send to backend API
    this.importMessage.set(`Importing ${companies.length} companies...`);
    this.sendBulkImportRequest(companies);
  }

  private sendBulkImportRequest(companies: CreateCompanyDTO[]): void {
    this.companyService.bulkImportCompanies(companies).subscribe({
      next: (response: BulkImportResponse) => {
        this.isImporting.set(false);
        this.importMessage.set('');
        
        if (response.success) {
          this.successMessage.set(
            `Successfully imported ${response.successfulRecords} out of ${response.totalRecords} companies.`
          );
          
          if (response.failedRecords > 0) {
            this.errorMessage.set(
              `${response.failedRecords} records failed to import. ${response.errors?.join(', ') || ''}`
            );
          }
        } else {
          this.errorMessage.set(response.message || 'Import failed due to server error.');
        }

        // Refresh companies grid if it's visible
        if (this.showCompaniesGrid()) {
          this.loadCompanies();
        }
      },
      error: (error: any) => {
        this.isImporting.set(false);
        this.importMessage.set('');
        this.errorMessage.set(
          error.error?.message || 
          'Import failed. Please check your connection and try again.'
        );
        console.error('Bulk import error:', error);
      }
    });
  }

  public exportCompanies(): void {
    console.log('Export companies clicked');
    this.isLoadingCompanies.set(true);
    this.errorMessage.set('');

    this.companyService.exportCompanies().subscribe({
      next: (companies: CompanyListDTO[]) => {
        this.isLoadingCompanies.set(false);
        
        if (companies.length === 0) {
          this.errorMessage.set('No company data available to export.');
          return;
        }

        this.generateExcelFile(companies);
      },
      error: (error: any) => {
        this.isLoadingCompanies.set(false);
        this.errorMessage.set(
          error.error?.message || 
          'Failed to fetch company data for export. Please try again.'
        );
        console.error('Error fetching companies for export:', error);
      }
    });
  }

  private generateExcelFile(companies: CompanyListDTO[]): void {
    try {
      // Prepare data for Excel export
      const exportData = companies.map(company => ({
        'Company Code': company.customerCode,
        'Company Name': company.customerName,
        'Company Address': company.customerAddress || '',
        'Currency Value': company.currency,
        'Created Date': new Date(company.createdDate).toLocaleDateString(),
        'Status': company.isActive ? 'Active' : 'Inactive'
      }));

      // Create a new workbook and worksheet
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(exportData);

      // Set column widths for better formatting
      const columnWidths = [
        { wch: 15 }, // Company Code
        { wch: 30 }, // Company Name
        { wch: 40 }, // Company Address
        { wch: 15 }, // Currency Value
        { wch: 15 }, // Created Date
        { wch: 10 }  // Status
      ];
      worksheet['!cols'] = columnWidths;

      // Add the worksheet to the workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Companies');

      // Generate filename with current date
      const currentDate = new Date().toISOString().split('T')[0];
      const filename = `companies_export_${currentDate}.xlsx`;

      // Write and download the file
      XLSX.writeFile(workbook, filename);

      this.successMessage.set(`Successfully exported ${companies.length} companies to ${filename}`);
    } catch (error) {
      this.errorMessage.set('Failed to generate Excel file. Please try again.');
      console.error('Excel generation error:', error);
    }
  }


}