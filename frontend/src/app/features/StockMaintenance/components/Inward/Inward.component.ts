import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../../services/category.service';
import { SpecificationService } from '../../../../services/specification.service';
import { LabelsService } from '../../../../services/labels.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-inward',
  standalone: true,
  imports: [CommonModule, FormsModule, NgSelectModule],
  templateUrl: './Inward.component.html',
  styleUrls: ['./Inward.component.css']
})
export class InwardComponent implements OnInit {
    get filteredSpecifications() {
      return this.specifications.filter(
        spec => spec.configurable === true && spec.editable === true && spec.background === false
      );
    }
  // Panel logic
  private panelExpanded = true;
  toggleStockInwardPanel() { this.panelExpanded = !this.panelExpanded; }
  isStockInwardPanelExpanded() { return this.panelExpanded; }

  // Controls
  inwardType: string = 'Single';
  stockType: string = 'Container';
  category: string = '';
  bulkQty: number | null = null;

  // Dropdown data
  categories: Array<{ id: string, name: string }> = [];
  containers: Array<{ id: string, name: string }> = [];
  items: Array<{ id: string, name: string }> = [];
  allLabelData: any[] = [];

  specifications: any[] = [];
  containerId: string = '';
  itemId: string = '';
  specValues: { [key: string]: string } = {};
  specChecked: { [key: string]: boolean } = {};

  ///constructor(private categoryService: CategoryService) {}
  //constructor(private categoryService: CategoryService, private labelsService: LabelsService) {}
  constructor(private categoryService: CategoryService, private labelsService: LabelsService, private specificationService: SpecificationService) {}

  ngOnInit(): void {
        // Load specifications from API
        this.specificationService.getAllSpecifications().subscribe({
          next: (specs: any[]) => {
            // Save all specification objects returned by the API
            this.specifications = specs;
          },
          error: () => {
            this.specifications = [];
          }
        });
    // Load categories
    this.categoryService.getAllCategories().subscribe({
      next: (cats: any[]) => {
        this.categories = cats
          .filter(cat => cat.isActive || cat.status === 'Active')
          .map(cat => ({
            id: (cat.categoryId || cat.id || cat.Id).toString(),
            name: cat.category
          }));
        if (!this.category && this.categories.length > 0) {
          this.category = this.categories[0].id;
        }
      },
      error: () => {
        this.categories = [];
      }
    });

    // Load containers from distinct-active-containers API
    this.labelsService.getDistinctActiveContainers().subscribe({
      next: (data: any[]) => {
        this.allLabelData = data;
        // Extract only distinct container_id values
        const uniqueIds = Array.from(new Set(data.map(l => l.containerId || l.container_id)));
        this.containers = uniqueIds.map(id => ({ id, name: id }));
      },
      error: () => {
        this.containers = [];
      }
    });
  
  }
  // Watch for containerId changes and update items dropdown
    ngOnChanges(): void {
      this.updateItemsForContainer();
    }

    updateItemsForContainer(): void {
      if (!this.containerId) {
        this.items = [];
        return;
      }
      // Filter allLabelData for selected containerId
      const filtered = this.allLabelData.filter(l => (l.containerId || l.container_id) === this.containerId);
      this.items = filtered.map(l => ({ id: l.itemId || l.item_id, name: l.itemId || l.item_id }));
    }
    // Add this to trigger item dropdown update on containerId change
    ngDoCheck(): void {
      this.updateItemsForContainer();
    }
  trackById(index: number, item: { id: string, name: string }): string {
    return item.id;
  }

  getSpecOptions(spec: string) {
    return [
      { id: spec + '1', name: spec + ' Option 1' },
      { id: spec + '2', name: spec + ' Option 2' },
      { id: spec + '3', name: spec + ' Option 3' }
    ];
  }
}