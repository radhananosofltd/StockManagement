import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SpecificationService } from '../../../../services/specification.service';
import { AuthService } from '../../../../services/auth.service';

interface Specification {
  id: number;
  isDefault: boolean;
  name: string;
  dataType: string;
  nameCase: string;
  valueCase: string;
  sku: boolean;
  editable: boolean;
  configurable: boolean;
  bulkInput: boolean;
  lockable: boolean;
  background: boolean;
  isActive: boolean;
}

@Component({
  selector: 'app-item-specification',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './item-specification.component.html',
  styleUrls: ['./item-specification.component.css']
})
export class ItemSpecificationComponent {
  title = 'Item Specification Configuration';
  specificationForm: FormGroup;
  
  // Signals for panel expansion states
  isFormExpanded = signal(true);
  isQuickActionsPanelExpanded = signal(true);
  
  // Signals for button states
  isImporting = signal(false);
  isExporting = signal(false);
  isSubmitting = signal(false);
  
  // Signals for grid
  showSpecificationsGrid = signal(false);
  isLoadingSpecifications = signal(false);
  specifications = signal<Specification[]>([]);

  private specificationService = inject(SpecificationService);

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.specificationForm = this.fb.group({
      isDefault: [{ value: false, disabled: true }],
      name: ['', [Validators.required]],
      dataType: ['Double', [Validators.required]],
      nameCase: ['Title'],
      valueCase: ['Title'],
      sku: [false],
      editable: [false],
      configurable: [false],
      bulkInput: [false],
      lockable: [false],
      background: [false],
      isActive: [true]
    });
  }

  toggleFormPanel() {
    this.isFormExpanded.set(!this.isFormExpanded());
  }

  toggleQuickActionsPanel() {
    this.isQuickActionsPanelExpanded.set(!this.isQuickActionsPanelExpanded());
  }

  onSubmit() {
    const currentUser = this.authService.getCurrentUser();
    if (this.specificationForm.valid) {
      this.isSubmitting.set(true);
      const payload = {
        IsDefault: this.specificationForm.get('isDefault')?.value,
        SpecificationName: this.specificationForm.get('name')?.value,
        Datatype: this.specificationForm.get('dataType')?.value,
        NameCase: this.specificationForm.get('nameCase')?.value,
        ValueCase: this.specificationForm.get('valueCase')?.value,
        Sku: this.specificationForm.get('sku')?.value,
        Editable: this.specificationForm.get('editable')?.value,
        Configurable: this.specificationForm.get('configurable')?.value,
        BulkInput: this.specificationForm.get('bulkInput')?.value,
        Lockable: this.specificationForm.get('lockable')?.value,
        Background: this.specificationForm.get('background')?.value,
        IsActive: this.specificationForm.get('isActive')?.value,
        UserId: currentUser?.id || null
      };
      (this.specificationService as any).addSpecification(payload).subscribe({
        next: (response: { SpecificationId: number }) => {
          this.isSubmitting.set(false);
          console.log('Specification added successfully', response);
          this.resetForm();
        },
        error: (err: any) => {
          this.isSubmitting.set(false);
          console.error('Error adding specification', err);
        }
      });
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.specificationForm.controls).forEach(key => {
        this.specificationForm.get(key)?.markAsTouched();
      });
    }
  }

  resetForm() {
    this.specificationForm.reset({
      isDefault: false,
      dataType: 'Double',
      nameCase: 'Title',
      valueCase: 'Title',
      sku: false,
      editable: false,
      configurable: false,
      bulkInput: false,
      lockable: false,
      background: false,
      isActive: true
    });
  }

  viewSpecifications() {
    console.log('View All Specifications clicked');
    this.showSpecificationsGrid.set(true);
    this.isLoadingSpecifications.set(true);
    
    // Simulate API call to fetch specifications
    setTimeout(() => {
      const mockSpecifications: Specification[] = [
        {
          id: 1,
          isDefault: true,
          name: 'Color',
          dataType: 'String',
          nameCase: 'Title',
          valueCase: 'Title',
          sku: true,
          editable: true,
          configurable: true,
          bulkInput: false,
          lockable: false,
          background: false,
          isActive: true
        },
        {
          id: 2,
          isDefault: false,
          name: 'Size',
          dataType: 'String',
          nameCase: 'Title',
          valueCase: 'Upper',
          sku: true,
          editable: true,
          configurable: true,
          bulkInput: false,
          lockable: false,
          background: false,
          isActive: true
        },
        {
          id: 3,
          isDefault: false,
          name: 'Weight',
          dataType: 'Double',
          nameCase: 'Title',
          valueCase: 'Double',
          sku: false,
          editable: true,
          configurable: false,
          bulkInput: true,
          lockable: false,
          background: false,
          isActive: false
        },
        {
          id: 4,
          isDefault: false,
          name: 'Manufacturing Date',
          dataType: 'DateTime',
          nameCase: 'Title',
          valueCase: 'DateTime',
          sku: false,
          editable: false,
          configurable: false,
          bulkInput: true,
          lockable: true,
          background: true,
          isActive: true
        },
        {
          id: 5,
          isDefault: false,
          name: 'Brand',
          dataType: 'String',
          nameCase: 'Upper',
          valueCase: 'Title',
          sku: true,
          editable: true,
          configurable: true,
          bulkInput: false,
          lockable: false,
          background: false,
          isActive: true
        }
      ];
      
      this.specifications.set(mockSpecifications);
      this.isLoadingSpecifications.set(false);
    }, 800);
  }

  hideSpecificationsGrid() {
    this.showSpecificationsGrid.set(false);
  }

  importSpecifications() {
    this.isImporting.set(true);
    console.log('Import Specifications clicked');
    
    // Simulate import process
    setTimeout(() => {
      this.isImporting.set(false);
      console.log('Import completed');
    }, 2000);
  }

  exportSpecifications() {
    this.isExporting.set(true);
    console.log('Export Specifications clicked');
    
    // Simulate export process
    setTimeout(() => {
      this.isExporting.set(false);
      console.log('Export completed');
    }, 2000);
  }
}