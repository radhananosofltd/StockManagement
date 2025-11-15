import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { COMPANY_ENDPOINTS, COUNTRY_ENDPOINTS, BRANCH_ENDPOINTS } from '../../../../constants/api-endpoints.constants';
import { AuthService } from '../../../../services/auth.service';
import * as XLSX from 'xlsx';

interface Branch {
  id: number;
  branchName: string;
  branchAddress: string;
  country: string;
  contactName: string;
  phone: string;
  createdDate: Date;
  isActive: boolean;
}

@Component({
  selector: 'app-branch',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './branch.component.html',
  styleUrl: './branch.component.css'
})
export class BranchComponent implements OnInit{
  // Import branches: file input and handler
  importBranchesInput: HTMLInputElement | null = null;

  openImportBranchesDialog(): void {
    if (!this.importBranchesInput) {
      this.importBranchesInput = document.createElement('input');
      this.importBranchesInput.type = 'file';
      this.importBranchesInput.accept = '.xlsx,.xls';
      this.importBranchesInput.style.display = 'none';
      this.importBranchesInput.addEventListener('change', (event: any) => {
        const file = event.target.files[0];
        if (file) {
          this.handleImportBranchesFile(file);
        }
      });
      document.body.appendChild(this.importBranchesInput);
    }
    this.importBranchesInput.value = '';
    this.importBranchesInput.click();
  }

  handleImportBranchesFile(file: File): void {
    this.errorMessage.set('');
    this.successMessage.set('');
    console.log('Selected file:', file);
    if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
      this.errorMessage.set('Only Excel files (.xlsx, .xls) are accepted.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: '' });
      console.log('Parsed Excel data:', jsonData);
      if (!jsonData || jsonData.length === 0) {
        this.errorMessage.set('Excel file is empty or could not be parsed.');
        console.log('error1');
        return;
      }
      // Validate columns
      const requiredColumns = [
        'branchCode', 'branchName', 'headOffice', 'contactPersonName', 'contactPersonEmail',
        'phone', 'branchAddress', 'branchCountryId', 'companyId', 'headOfficeBranchId', 'userId', 'isActive'
      ];
      const firstRow = jsonData[0] || {};
      const missingColumns = requiredColumns.filter(col => !Object.prototype.hasOwnProperty.call(firstRow, col));
      if (missingColumns.length > 0) {
        this.errorMessage.set('Missing columns: ' + missingColumns.join(', '));
        console.log('error2',missingColumns);
        return;
      }
      // Transform Excel data to match CreateBranchDTO requirements
      const transformedData = jsonData.map((row: any) => ({
        branchCode: row.branchCode,
        branchName: row.branchName,
        headOffice: row.headOffice === true || row.headOffice === 'TRUE' || row.headOffice === 'true',
        contactPersonName: row.contactPersonName,
        contactPersonEmail: row.contactPersonEmail,
        phone: typeof row.phone === 'string' ? row.phone : (row.phone ? String(row.phone) : ''),
        website: row.website && typeof row.website === 'string' && row.website.trim() !== '' ? row.website : null,
        pan: '',
        taxIdentificationNumberType: '',
        taxIdentificationNumber: '',
        branchAddress: row.branchAddress,
        branchCountryId: Number(row.branchCountryId) || null,
        companyId: Number(row.companyId) || null,
        headOfficeBranchId: Number(row.headOfficeBranchId) || null,
        userId: Number(row.userId) || null,
        isActive: row.isActive === true || row.isActive === 'TRUE' || row.isActive === 'true'
      }));
      console.log('json' , jsonData);
      this.isSubmitting.set(true);
      console.log('Sending bulk import request:', transformedData);
      try {
        this.http.post(BRANCH_ENDPOINTS.BULK_IMPORT, transformedData, {
          headers: { 'Content-Type': 'application/json' }
        }).subscribe({
          next: (response: any) => {
            this.viewBranches();
            this.isSubmitting.set(false);
            this.successMessage.set('Branches imported successfully!');
            console.log('Bulk import response:', response);
          },
            error: (error: any) => {
              this.isSubmitting.set(false);
              let detailedError = 'Failed to import branches.';
              // Extract validation errors from backend response
              if (error?.error) {
                if (error.error.errors) {
                  // ASP.NET Core ModelState error format
                  const errors = error.error.errors;
                  const errorMessages = Object.keys(errors).map(key => `${key}: ${errors[key].join(', ')}`);
                  detailedError += '\n' + errorMessages.join('\n');
                } else if (error.error.title) {
                  detailedError += ' ' + error.error.title;
                } else if (typeof error.error === 'string') {
                  detailedError += ' ' + error.error;
                } else if (error.error.message) {
                  detailedError += ' ' + error.error.message;
                }
              }
              this.errorMessage.set(detailedError);
              console.error('Error importing branches:', error);
            }
        });
      } catch (err) {
        this.isSubmitting.set(false);
        this.errorMessage.set('Could not send request. Check your network or API URL.');
        console.error('Request error:', err);
        alert('Request error: ' + err);
      }
    };
    reader.readAsArrayBuffer(file);
  }
  exportBranches(): void {
    this.isSubmitting.set(true);
    this.errorMessage.set('');
    this.successMessage.set('');
    // Fetch branch data as JSON
    this.http.get<any[]>(BRANCH_ENDPOINTS.GET_ALL).subscribe({
      next: (data: any[]) => {
        // Prepare data for Excel
        const exportData = data.map(branch => ({
          BranchName: branch.branchName,
          BranchAddress: branch.branchAddress,
          Country: branch.countryName,
          Phone: branch.phone,
          CreatedDate: branch.createdDate,
          IsActive: branch.isActive ? 'Active' : 'Inactive'
        }));
        const currentDate = new Date().toISOString().split('T')[0];
        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Branches');
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `branches_export_${currentDate}.xlsx`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        this.isSubmitting.set(false);
        this.successMessage.set('Export successful!');
      },
      error: (error: any) => {
        this.isSubmitting.set(false);
        this.errorMessage.set('Failed to export branches.');
        console.error('Error exporting branches:', error);
      }
    });
  }
  companies = signal<any[]>([]);
  countries = signal<any[]>([]);
  headOffices = signal<any[]>([]);
  branchForm: FormGroup;
  
  // Signals for panel expansion states
  isFormExpanded = signal(true);
  isBranchesPanelExpanded = signal(false);
  
  // Signals for UI states
  isSubmitting = signal(false);
  successMessage = signal('');
  errorMessage = signal('');
  showBranchesGrid = signal(false);
  isLoadingBranches = signal(false);
  branches = signal<Branch[]>([]);

  currentBranchPage = signal(1);
  branchesPerPage = 10;

  constructor(private fb: FormBuilder, private http: HttpClient, private authService: AuthService) {
    this.branchForm = this.fb.group({
      company: ['', [Validators.required]],
      branchCode: ['', [Validators.required, Validators.maxLength(20)]],
      branchName: ['', [Validators.required, Validators.maxLength(200)]],
      contactName: ['', [Validators.required, Validators.maxLength(100)]],
      contactEmail: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
      phone: ['', [Validators.pattern(/^[0-9 .\-]+$/)]],
      city: ['', [Validators.pattern(/^[a-zA-Z0-9 .\-]+$/)]],
      state: ['', [Validators.pattern(/^[a-zA-Z0-9 .\-]+$/)]],
      postalCode: ['', [Validators.pattern(/^[a-zA-Z0-9 .\-]+$/)]],
      branchAddress: ['', [Validators.maxLength(1000)]],
      country: ['', [Validators.required]],
      isActive: [true],
      isHeadOffice: [false],
      headOffice: ['']
    });

    // Subscribe to isHeadOffice changes to enable/disable headOffice dropdown
    this.branchForm.get('isHeadOffice')?.valueChanges.subscribe(isHeadOffice => {
      const headOfficeControl = this.branchForm.get('headOffice');
      if (isHeadOffice) {
        headOfficeControl?.setValue('');
        headOfficeControl?.disable();
      } else {
        headOfficeControl?.enable();
      }
    });
  }

  ngOnInit(): void {
    this.http.get<any[]>(COMPANY_ENDPOINTS.GET_ALL).subscribe({
      next: (data: any[]) => { this.companies.set(data); },
      error: (error: any) => { console.error('Error fetching companies', error); }
    });

    this.http.get<any>(COUNTRY_ENDPOINTS.GET_ALL).subscribe({
      next: (response: any) => {
        if (response && Array.isArray(response.data)) {
          this.countries.set(response.data);
        } else {
          this.countries.set([]);
        }
      },
      error: (error: any) => { console.error('Error fetching countries', error); }
    });

    // Fetch head office branch id for selected company
    this.branchForm.get('company')?.valueChanges.subscribe((companyId: number) => {
      if (companyId) {
        this.http.get<any>(`${BRANCH_ENDPOINTS.HEAD_OFFICES}/${companyId}`).subscribe({
          next: (data: any) => {
            if (data && data.headofficebranchid) {
              this.headOffices.set([{ branchId: data.headofficebranchid }]);
              this.branchForm.get('headOffice')?.setValue(data.headofficebranchid);
            } else {
              this.headOffices.set([]);
              this.branchForm.get('headOffice')?.setValue('');
            }
          },
          error: (error: any) => {
            this.headOffices.set([]);
            this.branchForm.get('headOffice')?.setValue('');
            console.error('Error fetching head office branch id', error);
          }
        });
      } else {
        this.headOffices.set([]);
        this.branchForm.get('headOffice')?.setValue('');
      }
    });
  }

  toggleFormPanel() {
    this.isFormExpanded.set(!this.isFormExpanded());
  }

  toggleBranchesPanel() {
    this.isBranchesPanelExpanded.set(!this.isBranchesPanelExpanded());
  }

  onSubmit() {
    if (this.branchForm.valid) {
      this.isSubmitting.set(true);
      this.successMessage.set('');
      this.errorMessage.set('');

      // Simulate API call
      setTimeout(() => {
        console.log('Branch Data:', this.branchForm.value);
        this.isSubmitting.set(false);
        this.successMessage.set('Branch added successfully!');
        
        // Clear success message after 3 seconds
        setTimeout(() => {
          this.successMessage.set('');
        }, 3000);

        this.resetForm();
      }, 1000);
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.branchForm.controls).forEach(key => {
        this.branchForm.get(key)?.markAsTouched();
      });
      this.errorMessage.set('Please fill in all required fields correctly.');
      
      // Clear error message after 3 seconds
      setTimeout(() => {
        this.errorMessage.set('');
      }, 3000);
    }
      if (this.branchForm.valid) {
        this.isSubmitting.set(true);
        this.successMessage.set('');
        this.errorMessage.set('');

        // Prepare payload for API
        const currentUser = this.authService.getCurrentUser();
        // Helper to convert empty string to null
        const toNull = (val: any) => (val === '' ? null : val);
        const payload = {
          branchCode: this.branchForm.value.branchCode,
          branchName: this.branchForm.value.branchName,
          headOffice: this.branchForm.value.isHeadOffice,
          contactPersonName: this.branchForm.value.contactName,
          contactPersonEmail: this.branchForm.value.contactEmail,
          phone: toNull(this.branchForm.value.phone),
          website: toNull(''),
          pan: toNull(''),
          taxIdentificationNumberType: toNull(''),
          taxIdentificationNumber: toNull(''),
          branchAddress: toNull(this.branchForm.value.branchAddress),
          branchCountryId: toNull(this.branchForm.value.country),
          companyId: toNull(this.branchForm.value.company),
          headOfficeBranchId: toNull(this.branchForm.value.headOffice),
          userId: currentUser?.id || null,
          isActive: this.branchForm.value.isActive
        };

        this.http.post(BRANCH_ENDPOINTS.CREATE, payload).subscribe({
          next: (response: any) => {
            this.isSubmitting.set(false);
            this.viewBranches();
            this.successMessage.set('Branch added successfully!');
            this.branchForm.reset();
          },
          error: (error: any) => {
            this.isSubmitting.set(false);
            this.errorMessage.set('Failed to add branch. Please try again.');
            console.error('Error adding branch:', error);
          }
        });
      } else {
        this.errorMessage.set('Please fill all required fields correctly.');
      }
  }

  resetForm() {
    this.branchForm.reset({
      company: '',
      isActive: true,
      isHeadOffice: false
    });
    this.successMessage.set('');
    this.errorMessage.set('');
  }

  viewBranches() {
    this.showBranchesGrid.set(true);
    this.isLoadingBranches.set(true);
    this.http.get<any[]>(BRANCH_ENDPOINTS.GET_ALL).subscribe({
      next: (data: any[]) => {
        // Map API response to Branch[] for grid display
        const branches = data.map(branch => ({
          id: branch.branchId,
          branchName: branch.branchName,
          branchAddress: branch.branchAddress,
          country: branch.countryName,
          contactName: branch.contactPersonName,
          phone: branch.phone,
          createdDate: branch.createdDate ? new Date(branch.createdDate) : new Date(),
          isActive: branch.isActive
        }));
        this.branches.set(branches);
        this.isLoadingBranches.set(false);
      },
      error: (error: any) => {
        this.isLoadingBranches.set(false);
        this.errorMessage.set('Failed to load branches.');
        console.error('Error fetching branches:', error);
      }
    });
  }

  hideBranchesGrid() {
    this.showBranchesGrid.set(false);
  }

  get pagedBranches() {
    const page = this.currentBranchPage();
    const start = (page - 1) * this.branchesPerPage;
    const end = start + this.branchesPerPage;
    return this.branches().slice(start, end);
  }

  get totalBranchPages() {
    return Math.ceil(this.branches().length / this.branchesPerPage);
  }

  setBranchPage(page: number) {
    this.currentBranchPage.set(page);
  }

  editBranch(branch: any) {
    // TODO: Implement edit logic
    console.log('Edit branch:', branch);
  }

  deleteBranch(branch: any) {
    // TODO: Implement delete logic
    console.log('Delete branch:', branch);
  }
}