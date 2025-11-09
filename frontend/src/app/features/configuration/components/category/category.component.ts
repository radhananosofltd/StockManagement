import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
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
    imports: [CommonModule, ReactiveFormsModule, DragDropModule],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
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

  constructor(private fb: FormBuilder) {
    this.categoryForm = this.fb.group({
      categoryName: ['', [Validators.required]],
      isActive: [true]
    });
    
    // Load specifications on component initialization
    this.loadSpecifications();
  }

  toggleAddCategoryPanel() {
    this.isAddCategoryPanelExpanded.update(value => !value);
  }

  toggleQuickActionsPanel() {
    this.isQuickActionsPanelExpanded.update(value => !value);
  }

  viewAllCategories() {
    console.log('View All Categories clicked');
    this.showAllCategoriesPanel.set(true);
    this.isViewingCategories.set(true);
    // 15 sample categories
    setTimeout(() => {
      this.categories.set([
        { category: 'Electronics', status: 'Active', createdDate: new Date('2023-01-01'), skuFields: 'model, brand, core, memory, speed, color' },
        { category: 'Apparel', status: 'Active', createdDate: new Date('2023-01-02'), skuFields: 'brand, color, size, material' },
        { category: 'Furniture', status: 'Inactive', createdDate: new Date('2023-01-03'), skuFields: 'model, material, color, dimensions' },
        { category: 'Books', status: 'Active', createdDate: new Date('2023-01-04'), skuFields: 'title, author, genre, language' },
        { category: 'Toys', status: 'Active', createdDate: new Date('2023-01-05'), skuFields: 'brand, age group, material, color' },
        { category: 'Groceries', status: 'Inactive', createdDate: new Date('2023-01-06'), skuFields: 'brand, type, weight, expiry' },
        { category: 'Beauty', status: 'Active', createdDate: new Date('2023-01-07'), skuFields: 'brand, type, color, size' },
        { category: 'Automotive', status: 'Active', createdDate: new Date('2023-01-08'), skuFields: 'model, brand, engine, color' },
        { category: 'Sports', status: 'Inactive', createdDate: new Date('2023-01-09'), skuFields: 'brand, type, size, color' },
        { category: 'Health', status: 'Active', createdDate: new Date('2023-01-10'), skuFields: 'brand, type, dosage, expiry' },
        { category: 'Stationery', status: 'Active', createdDate: new Date('2023-01-11'), skuFields: 'brand, type, color, size' },
        { category: 'Garden', status: 'Inactive', createdDate: new Date('2023-01-12'), skuFields: 'type, color, size, season' },
        { category: 'Jewelry', status: 'Active', createdDate: new Date('2023-01-13'), skuFields: 'type, material, color, brand' },
        { category: 'Footwear', status: 'Active', createdDate: new Date('2023-01-14'), skuFields: 'brand, color, size, material' },
        { category: 'Music', status: 'Inactive', createdDate: new Date('2023-01-15'), skuFields: 'title, artist, genre, format' }
      ]);
      this.isViewingCategories.set(false);
    }, 1000);
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
    console.log('Export Categories clicked');
    this.isExporting.set(true);
    // Simulate export
    setTimeout(() => {
      this.isExporting.set(false);
    }, 1500);
  }
  
  addCategory() {
    if (this.categoryForm.valid) {
      this.isSubmitting.set(true);
      console.log('Adding category:', this.categoryForm.value);
      // TODO: Implement API call
      setTimeout(() => {
        this.isSubmitting.set(false);
        this.resetForm();
      }, 1000);
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
  }
  
  loadSpecifications() {
    this.isLoadingSpecifications.set(true);
    // 15 sample specifications
    setTimeout(() => {
      this.specifications.set([
        { id: 1, isDefault: true, name: 'Color', dataType: 'String', nameCase: 'Title Case', valueCase: 'Upper Case', sku: true, editable: true, configurable: false, bulkInput: true, lockable: false, background: false, isActive: true },
        { id: 2, isDefault: false, name: 'Size', dataType: 'String', nameCase: 'Lower Case', valueCase: 'Lower Case', sku: false, editable: true, configurable: true, bulkInput: false, lockable: true, background: true, isActive: true },
        { id: 3, isDefault: false, name: 'Brand', dataType: 'String', nameCase: 'Title Case', valueCase: 'Title Case', sku: true, editable: false, configurable: true, bulkInput: true, lockable: false, background: false, isActive: true },
        { id: 4, isDefault: false, name: 'Manufacturing Date', dataType: 'Date', nameCase: 'Title Case', valueCase: 'Upper Case', sku: false, editable: true, configurable: false, bulkInput: false, lockable: true, background: true, isActive: true },
        { id: 5, isDefault: false, name: 'Weight', dataType: 'Double', nameCase: 'Title Case', valueCase: 'Lower Case', sku: true, editable: true, configurable: true, bulkInput: true, lockable: false, background: false, isActive: true },
        { id: 6, isDefault: false, name: 'Material', dataType: 'String', nameCase: 'Title Case', valueCase: 'Upper Case', sku: false, editable: true, configurable: false, bulkInput: false, lockable: false, background: true, isActive: true },
        { id: 7, isDefault: false, name: 'Length', dataType: 'Double', nameCase: 'Lower Case', valueCase: 'Lower Case', sku: true, editable: false, configurable: true, bulkInput: true, lockable: true, background: false, isActive: true },
        { id: 8, isDefault: false, name: 'Width', dataType: 'Double', nameCase: 'Title Case', valueCase: 'Title Case', sku: false, editable: true, configurable: false, bulkInput: false, lockable: false, background: true, isActive: true },
        { id: 9, isDefault: false, name: 'Height', dataType: 'Double', nameCase: 'Title Case', valueCase: 'Upper Case', sku: true, editable: true, configurable: true, bulkInput: true, lockable: false, background: false, isActive: true },
        { id: 10, isDefault: false, name: 'Volume', dataType: 'Double', nameCase: 'Lower Case', valueCase: 'Lower Case', sku: false, editable: true, configurable: false, bulkInput: false, lockable: true, background: true, isActive: true },
        { id: 11, isDefault: false, name: 'Surface Area', dataType: 'Double', nameCase: 'Title Case', valueCase: 'Title Case', sku: true, editable: false, configurable: true, bulkInput: true, lockable: false, background: false, isActive: true },
        { id: 12, isDefault: false, name: 'Expiration Date', dataType: 'Date', nameCase: 'Title Case', valueCase: 'Upper Case', sku: false, editable: true, configurable: false, bulkInput: false, lockable: true, background: true, isActive: true },
        { id: 13, isDefault: false, name: 'Batch Number', dataType: 'String', nameCase: 'Title Case', valueCase: 'Lower Case', sku: true, editable: true, configurable: true, bulkInput: true, lockable: false, background: false, isActive: true },
        { id: 14, isDefault: false, name: 'Supplier', dataType: 'String', nameCase: 'Lower Case', valueCase: 'Lower Case', sku: false, editable: true, configurable: false, bulkInput: false, lockable: true, background: true, isActive: true },
        { id: 15, isDefault: false, name: 'Country of Origin', dataType: 'String', nameCase: 'Title Case', valueCase: 'Title Case', sku: true, editable: false, configurable: true, bulkInput: true, lockable: false, background: false, isActive: true }
      ]);
      this.isLoadingSpecifications.set(false);
      this.isViewingCategories.set(false);
    }, 800);
  }
  
  onSpecificationAction(event: Event, specification: Specification) {
    const selectElement = event.target as HTMLSelectElement;
    const action = selectElement.value;
    
    if (action === 'add') {
      console.log('Adding specification to category:', specification.name);
      // TODO: Implement add specification to category logic
    } else if (action === 'remove') {
      console.log('Removing specification from category:', specification.name);
      // TODO: Implement remove specification from category logic
    }
    
    // Reset dropdown to default
    selectElement.value = '';
  }
  
  onSkuOrderChange(event: Event, specification: Specification) {
    const selectElement = event.target as HTMLSelectElement;
    const order = selectElement.value;
    
    console.log(`SKU Order changed for ${specification.name}: ${order}`);
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
}