import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import * as XLSX from 'xlsx';
import { SpecificationService } from '../../../../services/specification.service';
import { CategoryService, SaveCategoryRequest, CategorySpecificationRequest } from '../../../../services/category.service';
import { AuthService } from '../../../../services/auth.service';

interface Specification {
  specificationId: number;
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
  skuOrder?: number;
}

interface Category {
  id: number;
  categoryName: string;
  isActive: boolean;
  specifications: Specification[];
  createdDate: Date;
}

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, DragDropModule],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  message: string = '';
  isLoadingCategories = signal(false);
  hideCategoriesGrid() {
    // Hide the categories grid panel
    this.showAllCategoriesPanel.set(false);
  }
  categories = signal<Array<{category: string, status: string, createdDate: Date, skuFields: string}>>([]);
  title = 'Category Configuration';
  categoryForm: FormGroup;
  
  // Panel expansion states
  isAddCategoryPanelExpanded = signal(true);
  isQuickActionsPanelExpanded = signal(true);
  
  // Loading states
  isViewingCategories = signal(false);
  isImporting = signal(false);
  isExporting = signal(false);
  isSubmitting = signal(false);
  
  // Specifications grid
  showSpecificationsGrid = signal(false);
  isLoadingSpecifications = signal(false);
  specifications = signal<Specification[]>([]);
  showAllCategoriesPanel = signal(false);

    dropSpecificationRow(event: CdkDragDrop<Specification[]>) {
      const specs = [...this.specifications()];
      moveItemInArray(specs, event.previousIndex, event.currentIndex);
      this.specifications.set(specs);
    }

  constructor(
    private fb: FormBuilder,
    private specificationService: SpecificationService,
    private categoryService: CategoryService, private authService: AuthService
  ) {
    this.categoryForm = this.fb.group({
      categoryName: ['', [Validators.required]],
      isActive: [true]
    });
    // Load specifications from API on component initialization
    this.loadSpecifications();
  }

  toggleAddCategoryPanel() {
    this.isAddCategoryPanelExpanded.update(value => !value);
  }

  toggleQuickActionsPanel() {
    this.isQuickActionsPanelExpanded.update(value => !value);
  }

  viewAllCategories() {
    this.showAllCategoriesPanel.set(true);
    this.isViewingCategories.set(true);
    this.categoryService.getAllCategories().subscribe({
      next: (result: any[]) => {
        const formatted = result.map(cat => ({
          category: cat.category,
          status: cat.status,
          createdDate: new Date(cat.createdDate),
          skuFields: Array.isArray(cat.specifications) ? cat.specifications.join(', ') : ''
        }));
        this.categories.set(formatted);
        this.isViewingCategories.set(false);
      },
      error: (err) => {
        this.isViewingCategories.set(false);
        this.message = 'Unable to load categories.';
        console.error(err);
      }
    });
  }

  importCategories() {
    console.log('Import Categories clicked');
    this.isImporting.set(true);
    // Simulate import
    setTimeout(() => {
      this.isImporting.set(false);
    }, 2000);
  }

  exportCategories() {
    this.isExporting.set(true);
    this.categoryService.getAllCategories().subscribe({
      next: (result: any[]) => {
        const exportData = result.map(cat => ({
          Category: cat.category,
          Status: cat.status,
          CreatedDate: cat.createdDate,
          Specifications: Array.isArray(cat.specifications) ? cat.specifications.join(', ') : ''
        }));
        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Categories');
        const currentDate = new Date().toISOString().split('T')[0];
        XLSX.writeFile(workbook, `categories_export_${currentDate}.xlsx`);
        this.isExporting.set(false);
      },
      error: () => {
        this.isExporting.set(false);
        this.message = 'Unable to export categories.';
      }
    });
  }
  
  addCategory() {
    if (this.categoryForm.valid) {
      this.isSubmitting.set(true);
      // Collect selected specifications and SKU order from the grid
      const selectedSpecs: CategorySpecificationRequest[] = [];
      const specs = this.specifications();
      for (const spec of specs) {
        const checkbox = document.getElementById(spec.specificationId.toString()) as HTMLInputElement;
        if (checkbox && checkbox.checked) {
          const skuOrder = spec.skuOrder || 0;
          selectedSpecs.push({ specificationId: spec.specificationId, skuOrder });
        }
      }
      const currentUser = this.authService.getCurrentUser();
      const payload: SaveCategoryRequest = {
        categoryName: this.categoryForm.get('categoryName')?.value,
        isActive: this.categoryForm.get('isActive')?.value,
        specifications: selectedSpecs,
        userId: currentUser.id
      };
      this.categoryService.saveCategory(payload).subscribe({
        next: (response) => {
          this.isSubmitting.set(false);
          this.resetForm();
          this.message = 'Category and its specifications saved successfully!';
        },
        error: (err) => {
          this.isSubmitting.set(false);
          this.message = 'Unable to save category and its specifications.';
          console.error(err);
        }
      });
    } else {
      Object.keys(this.categoryForm.controls).forEach(key => {
        this.categoryForm.get(key)?.markAsTouched();
      });
    }
  }
  
  resetForm() {
    this.categoryForm.reset({
      categoryName: '',
      isActive: true
    });
    // Reset specifications grid: uncheck all, clear skuOrder
    const specs = this.specifications();
    for (const spec of specs) {
      // Uncheck the checkbox
      const checkbox = document.getElementById(spec.specificationId.toString()) as HTMLInputElement;
      if (checkbox) {
        checkbox.checked = false;
      }
      // Clear SKU order dropdown
      spec.skuOrder = undefined;
    }
    this.specifications.set([...specs]);
  }
  
  loadSpecifications() {
    this.isLoadingSpecifications.set(true);
    this.specificationService.getAllSpecifications().subscribe({
      next: (specs: Specification[]) => {
        console.log('Loaded specifications:', specs);
        this.specifications.set(specs);
        this.isLoadingSpecifications.set(false);
      },
      error: (err: any) => {
        this.isLoadingSpecifications.set(false);
        console.error('Error loading specifications', err);
      }
    });
  }
  
  onSpecificationAction(event: Event, specification: Specification) {
    const selectElement = event.target as HTMLSelectElement;
    const action = selectElement.value;
    
    if (action === 'add') {
      console.log('Adding specification to category:', specification.specificationName);
      // TODO: Implement add specification to category logic
    } else if (action === 'remove') {
      console.log('Removing specification from category:', specification.specificationName);
      // TODO: Implement remove specification from category logic
    }
    
    // Reset dropdown to default
    selectElement.value = '';
  }
  
  onSkuOrderChange(event: Event, specification: Specification) {
    const selectElement = event.target as HTMLSelectElement;
    const order = selectElement.value;
    
  console.log(`SKU Order changed for ${specification.specificationName}: ${order}`);
    // TODO: Implement SKU order logic
  }

  // Pagination signals
  currentCategoryPage = signal(1);
  categoriesPerPage = 10;

  get pagedCategories() {
    const page = this.currentCategoryPage();
    const start = (page - 1) * this.categoriesPerPage;
    const end = start + this.categoriesPerPage;
    return this.categories().slice(start, end);
  }

  get totalCategoryPages() {
    return Math.ceil(this.categories().length / this.categoriesPerPage);
  }

  setCategoryPage(page: number) {
    this.currentCategoryPage.set(page);
  }

  editCategory(cat: any) {
    // TODO: Implement edit logic
    console.log('Edit category:', cat);
  }

  deleteCategory(cat: any) {
    // TODO: Implement delete logic
    console.log('Delete category:', cat);
  }
}