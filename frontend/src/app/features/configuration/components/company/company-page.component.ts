import { Component, inject, signal, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CompanyService, CompanyListDTO, ApiResponse, BulkImportResponse, BulkImportCompanyDTO } from '../../../../services/company.service';
import { AuthService } from '../../../../services/auth.service';
import * as XLSX from 'xlsx';
import { COMPANY_ENDPOINTS, COUNTRY_ENDPOINTS, BRANCH_ENDPOINTS } from '../../../../constants/api-endpoints.constants';
import { HttpClient } from '@angular/common/http';

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
export class CompanyPageComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly companyService = inject(CompanyService);
  private readonly authService = inject(AuthService);
  constructor(private http: HttpClient) {}

  @ViewChild('companiesGrid', { static: false }) companiesGridRef?: ElementRef;

  public readonly isSubmitting = signal(false);
  public readonly isLoadingCompanies = signal(false);
  public readonly isImporting = signal(false);
  public readonly successMessage = signal('');
  public readonly errorMessage = signal('');
  public readonly importMessage = signal('');
  public readonly companies = signal<CompanyListDTO[]>([]);
  public readonly showCompaniesGrid = signal(false);
  public readonly isFormExpanded = signal(true); // Form panel expanded by default
  public readonly isQuickActionsExpanded = signal(false); // Quick actions panel expanded by default
  public readonly isCompaniesGridExpanded = signal(true); // Companies grid panel expanded by default
  public readonly isCompaniesPanelExpanded = signal(false); // Combined companies panel expanded by default


  // Pagination signals for companies
  currentCompanyPage = signal(1);
  companiesPerPage = 10;

  countries = signal<any[]>([]);
  ngOnInit(): void {
    this.http.get<any>(COUNTRY_ENDPOINTS.GET_ALL).subscribe({
      next: (response: any) => {
        if (response && Array.isArray(response.data)) {
          this.countries.set(response.data);
        } else {
          this.countries.set([]);
        }
      },
      error: (error: any) => {
        this.countries.set([]);
        console.error('Error fetching countries', error);
      }
    });
  }
  
  public readonly companyForm: FormGroup = this.fb.group({
    customerCode: ['', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9 .\-]+$/)
    ]],
    customerName: ['', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9 .\-]+$/)
    ]],
    contactName: ['', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9 .\-]+$/)
    ]],
    contactEmail: ['', [
      Validators.required,
      Validators.email
    ]],
    website: ['', [
      Validators.pattern(/^[a-zA-Z0-9 .\-@:\/]+$/)
    ]],
    companyLogoUrl: ['', [
      Validators.pattern(/^[a-zA-Z0-9 .\-:\/]+$/)
    ]],
    pan: ['', [
      Validators.pattern(/^[a-zA-Z0-9 .\-]+$/)
    ]],
    taxIdentificationNumberType: ['', [
      Validators.pattern(/^[a-zA-Z0-9 .\-]+$/)
    ]],
    taxIdentificationNumber: ['', [
      Validators.pattern(/^[a-zA-Z0-9 .\-]+$/)
    ]],
    isActive: [true],
    customerAddress: [''],
    country: ['', Validators.required],
    currency: ['USD', [
      Validators.required,
      Validators.pattern(/^[A-Z]{3}$/)
    ]]
  });

  
  public onSubmit(): void {
    if (this.companyForm.valid && !this.isSubmitting()) {
      this.isSubmitting.set(true);
      this.successMessage.set('');
      this.errorMessage.set('');

      // Prepare payload for API
      const payload = {
        companyCode: this.companyForm.value.customerCode?.trim() || '',
        companyName: this.companyForm.value.customerName?.trim() || '',
        contactName: this.companyForm.value.contactName?.trim() || '',
        contactEmail: this.companyForm.value.contactEmail?.trim() || '',
        website: this.companyForm.value.website?.trim() || '',
        companyLogoUrl: this.companyForm.value.companyLogoUrl?.trim() || '',
        pan: this.companyForm.value.pan?.trim() || '',
        taxIDNumberType: this.companyForm.value.taxIdentificationNumberType?.trim() || '',
        taxIDNumber: this.companyForm.value.taxIdentificationNumber?.trim() || '',
        companyAddress: this.companyForm.value.customerAddress?.trim() || '',
        countryId: Number(this.companyForm.value.country) || 0,
        userId: 0, // Set userId as needed
        isActive: !!this.companyForm.value.isActive
      };

      this.http.post(COMPANY_ENDPOINTS.CREATE, payload).subscribe({
        next: (response: any) => {
          this.isSubmitting.set(false);
          this.successMessage.set(`Company "${payload.companyName}" (${payload.companyCode}) has been successfully added!`);
          this.resetForm();
          this.showCompaniesGrid.set(true);
          this.loadCompanies(true);
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

  public toggleFormPanel(): void {
    this.isFormExpanded.set(!this.isFormExpanded());
  }

  public toggleQuickActionsPanel(): void {
    this.isQuickActionsExpanded.set(!this.isQuickActionsExpanded());
  }

  public toggleCompaniesGridPanel(): void {
    this.isCompaniesGridExpanded.set(!this.isCompaniesGridExpanded());
  }

  public toggleCompaniesPanel(): void {
    this.isCompaniesPanelExpanded.set(!this.isCompaniesPanelExpanded());
  }

  private loadCompanies(shouldScrollAfterLoad: boolean = false): void {
    this.isLoadingCompanies.set(true);
    this.errorMessage.set('');
    this.http.get<any>(COMPANY_ENDPOINTS.GET_ALL).subscribe({
      next: (response: any) => {
        // If response is an array, use it; else fallback to response.data
        let companiesArr = Array.isArray(response) ? response : (response?.data ?? []);
        this.companies.set(companiesArr);
        this.isLoadingCompanies.set(false);
        if (shouldScrollAfterLoad) {
          setTimeout(() => {
            this.scrollToCompaniesGrid();
          }, 300);
        }
      },
      error: (error: any) => {
        this.isLoadingCompanies.set(false);
        this.errorMessage.set(
          error.error?.message || 'Failed to load companies. Please try again.'
        );
        this.companies.set([]);
        console.error('Error loading companies:', error);
      }
    });

    // Uncomment this when backend API is ready:
    /*
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
    */
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
    console.log('import clicked');
    const headers = data[0];
    const dataRows = data.slice(1);

    // Validate headers - must contain exactly 4 columns
    if (headers.length !== 12) {
      this.isImporting.set(false);
      this.errorMessage.set('Excel file must contain exactly 12 columns');
      console.log('Excel file must contain exactly 12 columns');
      return;
    }

    // Expected header names (case-insensitive)
    const expectedHeaders = ['company code', 'company name', 'contact name', 'contact email', 'website', 'companyLogoURL', 'pan', 'taxIDNumberType', 'taxIDNumber', 'company address', 'countryId', 'isActive'];
    const actualHeaders = headers.map((h: string) => h.toString().toLowerCase().trim());
/*
    const missingHeaders: string[] = [];
    expectedHeaders.forEach((expected, index) => {
      if (actualHeaders[index] !== expected) {
        missingHeaders.push(expected);
      }
    });

    if (missingHeaders.length > 0) {
      this.isImporting.set(false);
      this.errorMessage.set(
        `Invalid column headers. Missing: ${missingHeaders.join(', ')}. ` +
        `Found: ${headers.join(', ')}`
      );
      console.log('Invalid column headers. Missing:', missingHeaders);
      return;
    }
*/
    // Validate that there's at least one data row
    if (dataRows.length === 0) {
      this.isImporting.set(false);
      this.errorMessage.set('Excel file must contain at least one data row.');
      console.log('Excel file must contain at least one data row.');
      return;
    }

    // Convert data rows to company DTOs
  const companies: BulkImportCompanyDTO[] = [];
    const errors: string[] = [];

    dataRows.forEach((row, index) => {
      const rowNumber = index + 2; // +2 because index starts at 0 and we skip header row

      if (row.length < 12) {
        errors.push(`Row ${rowNumber}: Missing required columns.`);
        console.log(`Row ${rowNumber}: Missing required columns.`);
        return;
      }

  const [companyCode, companyName, contactName, contactEmail, website, companyLogoURL, pan, taxIDNumberType, taxIDNumber, companyAddress, countryId, isActive, currencyValue] = row;

      // Validate required fields
      if (!companyCode || companyCode.toString().trim() === '') {
        errors.push(`Row ${rowNumber}: Company Code is required.`);
        console.log(`Row ${rowNumber}: Company Code is required.`);
        return;
      }

      if (!companyName || companyName.toString().trim() === '') {
        errors.push(`Row ${rowNumber}: Company Name is required.`);
        console.log(`Row ${rowNumber}: Company Name is required.`);
        return;
      }

      // Validate company code format
      const codePattern = /^[A-Za-z0-9]{3,10}$/;
      const code = companyCode.toString().trim();
    
      companies.push({
        companyCode: code,
        companyName: companyName.toString().trim(),
        contactName: contactName ? contactName.toString().trim() : '',
        contactEmail: contactEmail ? contactEmail.toString().trim() : '',
        website: website ? website.toString().trim() : '',
        companyLogoURL: companyLogoURL ? companyLogoURL.toString().trim() : '',
        pan: pan ? pan.toString().trim() : '',
        taxIDNumberType: taxIDNumberType ? taxIDNumberType.toString().trim() : '',
        taxIDNumber: taxIDNumber ? taxIDNumber.toString().trim() : '',
        companyAddress: companyAddress ? companyAddress.toString().trim() : '',
        countryId: countryId ? Number(countryId) : 0,
        userId: 0,
        isActive: isActive?.toString().toLowerCase() === 'true'
      });
    });

    if (errors.length > 0) {
      this.isImporting.set(false);
      this.errorMessage.set(`Validation errors found:\n${errors.join('\n')}`);
      console.log('Validation errors found:', errors);
      return;
    }

    if (companies.length === 0) {
      this.isImporting.set(false);
      this.errorMessage.set('No valid company records found in the Excel file.');
      console.log('No valid company records found in the Excel file.');
      return;
    }

  // Send to backend API
  console.log('Importing companies:', companies);
  this.importMessage.set(`Importing ${companies.length} companies...`);
  this.sendBulkImportRequest(companies);
  }

  private sendBulkImportRequest(companies: BulkImportCompanyDTO[]): void {
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
        'Company Code': company.companyCode,
        'Company Name': company.companyName,
        'Company Address': company.companyAddress || '',
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

  get pagedCompanies() {
    const page = this.currentCompanyPage();
    const start = (page - 1) * this.companiesPerPage;
    const end = start + this.companiesPerPage;
    return this.companies().slice(start, end);
  }

  get totalCompanyPages() {
    return Math.ceil(this.companies().length / this.companiesPerPage);
  }

  setCompanyPage(page: number) {
    this.currentCompanyPage.set(page);
  }

  deleteCompany(company: CompanyListDTO) {
    const companyId = company.id;
    const currentUser = this.authService.getCurrentUser();
    const userId = currentUser?.id || 0;
    this.companyService.deleteCompany(companyId, userId).subscribe({
      next: (response: any) => {
        this.successMessage.set('Company deleted successfully.');
        this.viewCompanies();
      },
      error: (err: any) => {
        this.errorMessage.set('Failed to delete company.');
        console.error('Delete company error:', err);
      }
    });
  }

    editCompany(company: CompanyListDTO) {
    // TODO: Implement delete logic
    console.log('Edit company:', company);
  }
}