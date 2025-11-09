import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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
export class BranchComponent {
  branchForm: FormGroup;
  
  // Signals for panel expansion states
  isFormExpanded = signal(true);
  isBranchesPanelExpanded = signal(true);
  
  // Signals for UI states
  isSubmitting = signal(false);
  successMessage = signal('');
  errorMessage = signal('');
  showBranchesGrid = signal(false);
  isLoadingBranches = signal(false);
  branches = signal<Branch[]>([]);

  // Pagination signals for branches
  currentBranchPage = signal(1);
  branchesPerPage = 10;

  constructor(private fb: FormBuilder) {
    this.branchForm = this.fb.group({
      company: ['', [Validators.required]],
      branchCode: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9 .\-]+$/)]],
      branchName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9 .\-]+$/)]],
      contactName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9 .\-]+$/)]],
      contactEmail: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.pattern(/^[0-9 .\-]+$/)]],
      city: ['', [Validators.pattern(/^[a-zA-Z0-9 .\-]+$/)]],
      state: ['', [Validators.pattern(/^[a-zA-Z0-9 .\-]+$/)]],
      postalCode: ['', [Validators.pattern(/^[a-zA-Z0-9 .\-]+$/)]],
      branchAddress: [''],
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
    
    // Simulate API call to fetch branches
    setTimeout(() => {
        const mockBranches: Branch[] = [
          { id: 1, branchName: 'Downtown Branch', branchAddress: '123 Main Street, Suite 100', country: 'United States', contactName: 'John Doe', phone: '+1 555-0100', createdDate: new Date('2024-01-15'), isActive: true },
          { id: 2, branchName: 'North Branch', branchAddress: '456 North Avenue, Floor 2', country: 'India', contactName: 'Jane Smith', phone: '+91 98765-43210', createdDate: new Date('2024-02-20'), isActive: true },
          { id: 3, branchName: 'West Coast Branch', branchAddress: '789 Pacific Blvd', country: 'United Kingdom', contactName: 'Bob Johnson', phone: '+44 20 7946 0958', createdDate: new Date('2024-03-10'), isActive: false },
          { id: 4, branchName: 'East Branch', branchAddress: '101 East St', country: 'China', contactName: 'Li Wei', phone: '+86 10 1234 5678', createdDate: new Date('2024-04-05'), isActive: true },
          { id: 5, branchName: 'South Branch', branchAddress: '202 South Ave', country: 'Brazil', contactName: 'Carlos Silva', phone: '+55 21 98765-4321', createdDate: new Date('2024-05-12'), isActive: true },
          { id: 6, branchName: 'Central Branch', branchAddress: '303 Central Blvd', country: 'Germany', contactName: 'Anna Müller', phone: '+49 30 123456', createdDate: new Date('2024-06-18'), isActive: false },
          { id: 7, branchName: 'Mountain Branch', branchAddress: '404 Mountain Rd', country: 'Nepal', contactName: 'Suman Gurung', phone: '+977 1 5555555', createdDate: new Date('2024-07-22'), isActive: true },
          { id: 8, branchName: 'River Branch', branchAddress: '505 River St', country: 'Egypt', contactName: 'Fatima Hassan', phone: '+20 2 12345678', createdDate: new Date('2024-08-30'), isActive: true },
          { id: 9, branchName: 'Desert Branch', branchAddress: '606 Desert Ave', country: 'Saudi Arabia', contactName: 'Omar Al-Farsi', phone: '+966 11 1234567', createdDate: new Date('2024-09-14'), isActive: false },
          { id: 10, branchName: 'Island Branch', branchAddress: '707 Island Rd', country: 'Australia', contactName: 'Emily Brown', phone: '+61 2 9876 5432', createdDate: new Date('2024-10-01'), isActive: true },
          { id: 11, branchName: 'Forest Branch', branchAddress: '808 Forest St', country: 'Canada', contactName: 'Michael Green', phone: '+1 416-555-1234', createdDate: new Date('2024-11-11'), isActive: true },
          { id: 12, branchName: 'Lake Branch', branchAddress: '909 Lake Ave', country: 'Finland', contactName: 'Laura Virtanen', phone: '+358 9 1234567', createdDate: new Date('2024-12-20'), isActive: false },
          { id: 13, branchName: 'Harbor Branch', branchAddress: '1010 Harbor Rd', country: 'Singapore', contactName: 'Tan Wei', phone: '+65 6123 4567', createdDate: new Date('2025-01-05'), isActive: true },
          { id: 14, branchName: 'Valley Branch', branchAddress: '1111 Valley St', country: 'South Africa', contactName: 'Thabo Nkosi', phone: '+27 11 123 4567', createdDate: new Date('2025-02-15'), isActive: true },
          { id: 15, branchName: 'Plaza Branch', branchAddress: '1212 Plaza Ave', country: 'Spain', contactName: 'Maria Garcia', phone: '+34 91 123 4567', createdDate: new Date('2025-03-10'), isActive: false }
        ];
        this.branches.set(mockBranches);
        this.isLoadingBranches.set(false);
      }, 800);
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
}