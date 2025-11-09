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

  constructor(private fb: FormBuilder) {
    this.branchForm = this.fb.group({
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
        {
          id: 1,
          branchName: 'Downtown Branch',
          branchAddress: '123 Main Street, Suite 100',
          country: 'United States',
          contactName: 'John Doe',
          phone: '+1 555-0100',
          createdDate: new Date('2024-01-15'),
          isActive: true
        },
        {
          id: 2,
          branchName: 'North Branch',
          branchAddress: '456 North Avenue, Floor 2',
          country: 'India',
          contactName: 'Jane Smith',
          phone: '+91 98765-43210',
          createdDate: new Date('2024-02-20'),
          isActive: true
        },
        {
          id: 3,
          branchName: 'West Coast Branch',
          branchAddress: '789 Pacific Blvd',
          country: 'United Kingdom',
          contactName: 'Bob Johnson',
          phone: '+44 20 7946 0958',
          createdDate: new Date('2024-03-10'),
          isActive: false
        }
      ];
      
      this.branches.set(mockBranches);
      this.isLoadingBranches.set(false);
    }, 800);
  }

  hideBranchesGrid() {
    this.showBranchesGrid.set(false);
  }
}