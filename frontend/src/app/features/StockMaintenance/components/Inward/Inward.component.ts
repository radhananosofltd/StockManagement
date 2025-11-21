import { Component, OnInit, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { CategoryService } from '../../../../services/category.service';
import { SpecificationService } from '../../../../services/specification.service';
import { SkuService } from '../../../../services/sku.service';
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
export class InwardComponent implements OnInit, OnChanges {
  finalSku: string = '';
 // bulkSku: string = '';
  onSpecValueChange(spec: any, selectedOption: any): void {
    // selectedOption is the full option object from ng-select
    console.log('onSpecValueChange:', { spec, selectedOption });
    spec.sku_code = selectedOption && selectedOption.sku_code ? selectedOption.sku_code : '';
    this.updateFinalSku();
    this.cdr.detectChanges();
  }

  updateFinalSku(): void {
      this.finalSku = this.filteredSpecifications
        .map(spec => spec.sku_code)
        .filter(code => !!code)
        .join('-');    
  }
  isLoading: boolean = true;
  get filteredSpecifications() {
    if (this.inwardType === 'Bulk') {
          console.log(this.specifications);
      return this.specifications.filter(
        spec => spec.configurable === true && spec.editable === true && spec.background === false && spec.bulkInput === true
      );
    }
    else{
    return this.specifications.filter(
      spec => spec.configurable === true && spec.editable === true && spec.background === false && spec.bulkInput === false
    );
  }
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
  constructor(
    private categoryService: CategoryService,
    private labelsService: LabelsService,
    private specificationService: SpecificationService,
    private skuService: SkuService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    // Use forkJoin to wait for all API calls to complete
    import('rxjs').then(rxjs => {
      const { forkJoin, of } = rxjs;
      forkJoin({
        specifications: this.specificationService.getAllSpecifications(),
        skus: this.skuService.getAllSkus(),
        categories: this.categoryService.getAllCategories(),
        containers: this.labelsService.getDistinctActiveContainers()
      }).subscribe(({ specifications, skus, categories, containers }) => {
    // Watch for inwardType changes and update bulkSku and items
        // Set specifications
        this.specifications = specifications || [];
        // Map SKUs to specifications and set default dropdown value
        if (Array.isArray(skus) && Array.isArray(this.specifications)) {
          this.specifications.forEach(spec => {
            const matchingSkus = skus.filter(sku => sku.specificationId === spec.specificationId);
            spec.skuValues = matchingSkus.map(sku => ({ skuvalue: sku.value, sku_code: sku.skuCode }));
            // Set the first value as selected in the dropdown
            if (spec.skuValues && spec.skuValues.length > 0) {
              this.specValues[spec.specificationName] = spec.skuValues[0].skuvalue;
              spec.sku_code = spec.skuValues[0].sku_code;
            } else {
              spec.sku_code = '';
            }
          });
          this.updateFinalSku();
        }
        // Set categories
        this.categories = (categories || [])
          .filter(cat => cat.isActive || cat.status === 'Active')
          .map(cat => ({
            id: (cat.categoryId || cat.id || cat.Id).toString(),
            name: cat.category
          }));
        if (!this.category && this.categories.length > 0) {
          this.category = this.categories[0].id;
        }
        // Set containers
        this.allLabelData = containers || [];
        const uniqueIds = Array.from(new Set((containers || []).map((l: any) => l.containerId || l.container_id)));
        this.containers = uniqueIds.map(id => ({ id, name: id }));
        this.isLoading = false;
        console.log('Loader should now hide (success)');
        this.cdr.detectChanges();
      }, err => {
        // On error, still hide loader
        this.isLoading = false;
        console.log('Loader should now hide (error)');
        this.cdr.detectChanges();
      });
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
    const filtered = this.allLabelData.filter((l: any) => (l.containerId || l.container_id) === this.containerId);
    this.items = filtered.map((l: any) => ({ id: l.itemId || l.item_id, name: l.itemId || l.item_id }));
  }

  ngDoCheck(): void {
    this.updateItemsForContainer();
  }

  trackById(index: number, item: { id: string, name: string }): string {
    return item.id;
  }

  getSpecOptions(specName: string): any[] {
    const specObj = this.specifications.find((s: any) => s.specificationName === specName);
    return specObj && specObj.skuValues ? specObj.skuValues : [];
  }
}