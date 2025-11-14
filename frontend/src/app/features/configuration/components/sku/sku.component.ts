import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sku',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sku.component.html',
  styleUrls: ['./sku.component.css']
})
export class SkuComponent {
  // Panel expand/collapse state
  specPanelExpanded = true;
  quickPanelExpanded = true;

  // Panel toggle methods
  toggleSpecPanel() {
    this.specPanelExpanded = !this.specPanelExpanded;
  }
  isSpecPanelExpanded() {
    return this.specPanelExpanded;
  }

  toggleQuickPanel() {
    this.quickPanelExpanded = !this.quickPanelExpanded;
  }
  isQuickPanelExpanded() {
    return this.quickPanelExpanded;
  }

  // SKU grid sample data and logic
  isLoadingSkus = false;
  skus = [
    { id: 1, specificationName: 'Color', value: 'Red', skuCode: 'SKU001', status: 'Active' },
    { id: 2, specificationName: 'Size', value: 'Large', skuCode: 'SKU002', status: 'Inactive' },
    { id: 3, specificationName: 'Material', value: 'Cotton', skuCode: 'SKU003', status: 'Active' },
    { id: 4, specificationName: 'Weight', value: '1kg', skuCode: 'SKU004', status: 'Active' },
    { id: 5, specificationName: 'Length', value: '100cm', skuCode: 'SKU005', status: 'Inactive' },
    { id: 6, specificationName: 'Width', value: '50cm', skuCode: 'SKU006', status: 'Active' },
    { id: 7, specificationName: 'Height', value: '30cm', skuCode: 'SKU007', status: 'Active' },
    { id: 8, specificationName: 'Volume', value: '10L', skuCode: 'SKU008', status: 'Inactive' },
    { id: 9, specificationName: 'Brand', value: 'NanoSoft', skuCode: 'SKU009', status: 'Active' },
    { id: 10, specificationName: 'Model', value: 'X100', skuCode: 'SKU010', status: 'Active' },
    { id: 11, specificationName: 'Batch', value: 'B2025', skuCode: 'SKU011', status: 'Inactive' },
    { id: 12, specificationName: 'Expiry', value: '2026-01-01', skuCode: 'SKU012', status: 'Active' },
    { id: 13, specificationName: 'Origin', value: 'India', skuCode: 'SKU013', status: 'Active' },
    { id: 14, specificationName: 'Certification', value: 'ISO', skuCode: 'SKU014', status: 'Inactive' },
    { id: 15, specificationName: 'Barcode', value: '1234567890', skuCode: 'SKU015', status: 'Active' }
  ];

  pageSize = 10;
  currentSkuPage = 1;
  showSkuGrid = false;
  get totalSkuPages() {
    return Math.ceil(this.skus.length / this.pageSize);
  }
  get pagedSkus() {
    const start = (this.currentSkuPage - 1) * this.pageSize;
    return this.skus.slice(start, start + this.pageSize);
  }
  setSkuPage(page: number) {
    if (page >= 1 && page <= this.totalSkuPages) {
      this.currentSkuPage = page;
    }
  }
  hideSkuGrid() {
    this.showSkuGrid = false;
  }

  // Button click handlers (stub)
  viewSkus() {
    this.showSkuGrid = true;
    setTimeout(() => {
      const grid = document.getElementById('sku-grid');
      if (grid) {
        grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  }
  importSkus() {
    // TODO: Implement import SKUs logic
  }
  exportSkus() {
    // TODO: Implement export SKUs logic
  }
  editSku(sku: any) {
    // TODO: Implement edit SKU logic
  }
  deleteSku(sku: any) {
    // TODO: Implement delete SKU logic
  }
}