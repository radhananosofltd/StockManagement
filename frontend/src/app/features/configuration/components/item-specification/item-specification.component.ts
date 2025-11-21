import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SpecificationService } from '../../../../services/specification.service';
import { AuthService } from '../../../../services/auth.service';
import * as XLSX from 'xlsx';

interface Specification {
  id: number;
  isDefault: boolean;
  specificationName: string;
  datatype: string;
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
      isEdit: boolean = false;
      editingSpecificationId: number | null = null;
    successMessage = signal('');
    errorMessage = signal('');
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
      if (this.isEdit && this.editingSpecificationId) {
        // Update mode
        (this.specificationService as any).updateSpecification(this.editingSpecificationId, payload).subscribe({
          next: (response: any) => {
            this.isSubmitting.set(false);
            console.log('Specification updated successfully', response);
            this.isEdit = false;
            this.editingSpecificationId = null;
            this.resetForm();
          },
          error: (err: any) => {
            this.isSubmitting.set(false);
            console.error('Error updating specification', err);
          }
        });
      } else {
        // Add mode
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
      }
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
    this.showSpecificationsGrid.set(true);
    this.isLoadingSpecifications.set(true);

    (this.specificationService as any).getAllSpecifications().subscribe({
      next: (specs: any[]) => {
        this.specifications.set(specs);
        this.isLoadingSpecifications.set(false);
      },
      error: (err: any) => {
        this.isLoadingSpecifications.set(false);
        console.error('Error fetching specifications', err);
      }
    });
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
    (this.specificationService as any).getAllSpecifications().subscribe({
      next: (specs: any[]) => {
        // Remove UserId column from export
        const exportSpecs = specs.map(({ UserId, ...rest }) => rest);
        const worksheet = XLSX.utils.json_to_sheet(exportSpecs);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Specifications');
        // Download Excel file
        const currentDate = new Date().toISOString().split('T')[0];
        XLSX.writeFile(workbook, `specifications_export_${currentDate}.xlsx`);
        this.isExporting.set(false);
        console.log('Export completed');
      },
      error: (err: any) => {
        this.isExporting.set(false);
        console.error('Error exporting specifications', err);
      }
    });
  }

  onFileChange(event: any) {
    const target: DataTransfer = <DataTransfer>(event.target);
    if (target.files.length !== 1) {
      console.log('Please select a single Excel file.');
      return;
    }
    const file = target.files[0];
    if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
      console.log('Only Excel files are allowed.');
      return;
    }
    this.isImporting.set(true);
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws);
      // Call bulk-import API
      (this.specificationService as any).bulkImportSpecifications(data).subscribe({
        next: (response: any) => {
          this.isImporting.set(false);
          console.log('Bulk import completed.');
          this.viewSpecifications();
        },
        error: (err: any) => {
          this.isImporting.set(false);
          console.error('Bulk import error', err);
        }
      });
    };
    reader.readAsBinaryString(file);
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

  editSpecification(spec: any) {
    // Fetch the latest specification data from the API and patch the form
    const specificationId = spec.id ?? spec.specificationId;
    this.isEdit = true;
    this.editingSpecificationId = specificationId;
    this.isLoadingSpecifications.set(true);
    (this.specificationService as any).getSpecificationById(specificationId).subscribe({
      next: (fetched: any) => {
        this.isLoadingSpecifications.set(false);
        // Patch the form with the correct mapping to form control names
        this.specificationForm.patchValue({
          isDefault: fetched.isDefault ?? false,
          name: fetched.specificationName ?? '',
          dataType: fetched.datatype ?? 'Double',
          nameCase: fetched.nameCase ?? 'Title',
          valueCase: fetched.valueCase ?? 'Title',
          sku: fetched.sku ?? false,
          editable: fetched.editable ?? false,
          configurable: fetched.configurable ?? false,
          bulkInput: fetched.bulkInput ?? false,
          lockable: fetched.lockable ?? false,
          background: fetched.background ?? false,
          isActive: fetched.isActive ?? true
        });
        // Mark all fields as touched to update UI
        Object.keys(this.specificationForm.controls).forEach(key => {
          this.specificationForm.get(key)?.markAsTouched();
        });
        this.isFormExpanded.set(true);
      },
      error: (err: any) => {
        this.isLoadingSpecifications.set(false);
        // If 404, fallback to patching with the selected spec's values
        if (err.status === 404) {
          this.specificationForm.patchValue({
            isDefault: spec.isDefault ?? false,
            name: spec.specificationName ?? '',
            dataType: spec.datatype ?? 'Double',
            nameCase: spec.nameCase ?? 'Title',
            valueCase: spec.valueCase ?? 'Title',
            sku: spec.sku ?? false,
            editable: spec.editable ?? false,
            configurable: spec.configurable ?? false,
            bulkInput: spec.bulkInput ?? false,
            lockable: spec.lockable ?? false,
            background: spec.background ?? false,
            isActive: spec.isActive ?? true
          });
          Object.keys(this.specificationForm.controls).forEach(key => {
            this.specificationForm.get(key)?.markAsTouched();
          });
          this.isFormExpanded.set(true);
        } else {
          this.errorMessage.set('Failed to fetch specification for editing.');
          console.error('Error fetching specification:', err);
        }
      }
    });
  }

  deleteSpecification(spec: any) {
    const specificationId = spec.id ?? spec.specificationId;
    const currentUser = this.authService.getCurrentUser();
    const userId = currentUser?.id || 0;
    this.specificationService.deleteSpecification(specificationId, userId).subscribe({
      next: (response: any) => {
        this.successMessage.set('Specification deleted successfully.');
        this.viewSpecifications();
      },
      error: (err: any) => {
        this.errorMessage.set('Failed to delete specification.');
        console.error('Delete specification error:', err);
      }
    });
  }
}