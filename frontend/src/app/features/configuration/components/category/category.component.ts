import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  title = 'Category Configuration';
  
  // Panel expansion states
  isAddCategoryPanelExpanded = signal(true);
  isQuickActionsPanelExpanded = signal(true);
  
  // Loading states
  isViewingCategories = signal(false);
  isImporting = signal(false);
  isExporting = signal(false);

  toggleAddCategoryPanel() {
    this.isAddCategoryPanelExpanded.update(value => !value);
  }

  toggleQuickActionsPanel() {
    this.isQuickActionsPanelExpanded.update(value => !value);
  }

  viewAllCategories() {
    console.log('View All Categories clicked');
    this.isViewingCategories.set(true);
    // Simulate loading
    setTimeout(() => {
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
}