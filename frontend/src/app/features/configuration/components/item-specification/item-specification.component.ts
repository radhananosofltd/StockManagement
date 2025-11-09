import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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

  // Pagination signals for specifications
  currentSpecificationPage = signal(1);
  specificationsPerPage = 10;

  constructor(private fb: FormBuilder) {
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
    if (this.specificationForm.valid) {
      this.isSubmitting.set(true);
      console.log('Specification Data:', this.specificationForm.getRawValue());
      
      // Simulate API call
      setTimeout(() => {
        this.isSubmitting.set(false);
        console.log('Specification added successfully');
        this.resetForm();
      }, 1000);
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
        { id: 1, isDefault: true, name: 'Color', dataType: 'String', nameCase: 'Title', valueCase: 'Title', sku: true, editable: true, configurable: true, bulkInput: false, lockable: false, background: false, isActive: true },
        { id: 2, isDefault: false, name: 'Size', dataType: 'String', nameCase: 'Title', valueCase: 'Upper', sku: true, editable: true, configurable: true, bulkInput: false, lockable: false, background: false, isActive: true },
        { id: 3, isDefault: false, name: 'Weight', dataType: 'Double', nameCase: 'Title', valueCase: 'Double', sku: false, editable: true, configurable: false, bulkInput: true, lockable: false, background: false, isActive: false },
        { id: 4, isDefault: false, name: 'Manufacturing Date', dataType: 'DateTime', nameCase: 'Title', valueCase: 'DateTime', sku: false, editable: false, configurable: false, bulkInput: true, lockable: true, background: true, isActive: true },
        { id: 5, isDefault: false, name: 'Brand', dataType: 'String', nameCase: 'Upper', valueCase: 'Title', sku: true, editable: true, configurable: true, bulkInput: false, lockable: false, background: false, isActive: true },
        { id: 6, isDefault: false, name: 'Material', dataType: 'String', nameCase: 'Title', valueCase: 'Upper', sku: false, editable: true, configurable: false, bulkInput: false, lockable: false, background: true, isActive: true },
        { id: 7, isDefault: false, name: 'Length', dataType: 'Double', nameCase: 'Lower', valueCase: 'Lower', sku: true, editable: false, configurable: true, bulkInput: true, lockable: true, background: false, isActive: true },
        { id: 8, isDefault: false, name: 'Width', dataType: 'Double', nameCase: 'Title', valueCase: 'Title', sku: false, editable: true, configurable: false, bulkInput: false, lockable: false, background: true, isActive: true },
        { id: 9, isDefault: false, name: 'Height', dataType: 'Double', nameCase: 'Title', valueCase: 'Upper', sku: true, editable: true, configurable: true, bulkInput: true, lockable: false, background: false, isActive: true },
        { id: 10, isDefault: false, name: 'Volume', dataType: 'Double', nameCase: 'Lower', valueCase: 'Lower', sku: false, editable: true, configurable: false, bulkInput: false, lockable: true, background: true, isActive: true },
        { id: 11, isDefault: false, name: 'Surface Area', dataType: 'Double', nameCase: 'Title', valueCase: 'Title', sku: true, editable: false, configurable: true, bulkInput: true, lockable: false, background: false, isActive: true },
        { id: 12, isDefault: false, name: 'Expiration Date', dataType: 'Date', nameCase: 'Title', valueCase: 'Upper', sku: false, editable: true, configurable: false, bulkInput: false, lockable: true, background: true, isActive: true },
        { id: 13, isDefault: false, name: 'Batch Number', dataType: 'String', nameCase: 'Title', valueCase: 'Lower', sku: true, editable: true, configurable: true, bulkInput: true, lockable: false, background: false, isActive: true },
        { id: 14, isDefault: false, name: 'Supplier', dataType: 'String', nameCase: 'Lower', valueCase: 'Lower', sku: false, editable: true, configurable: false, bulkInput: false, lockable: true, background: true, isActive: true },
        { id: 15, isDefault: false, name: 'Country of Origin', dataType: 'String', nameCase: 'Title', valueCase: 'Title', sku: true, editable: false, configurable: true, bulkInput: true, lockable: false, background: false, isActive: true }
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

  get pagedSpecifications() {
    const page = this.currentSpecificationPage();
    const start = (page - 1) * this.specificationsPerPage;
    const end = start + this.specificationsPerPage;
    return this.specifications().slice(start, end);
  }

  get totalSpecificationPages() {
    return Math.ceil(this.specifications().length / this.specificationsPerPage);
  }

  setSpecificationPage(page: number) {
    this.currentSpecificationPage.set(page);
  }
}