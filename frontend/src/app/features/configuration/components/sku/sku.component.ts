import { Component, OnInit, ViewChild, ElementRef, signal } from '@angular/core';
import * as XLSX from 'xlsx';
import { CommonModule } from '@angular/common';
import { SpecificationService } from '../../../../services/specification.service';
import { SkuService } from '../../../../services/sku.service';
import { AuthService } from '../../../../services/auth.service';
import { ChangeDetectorRef } from '@angular/core';
import { BulkImportResponse } from '../../../../models/bulk-import-response.model';

@Component({
  selector: 'app-sku',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sku.component.html',
  styleUrls: ['./sku.component.css']
})
export class SkuComponent implements OnInit {
    specifications: Array<{ specificationId: number, specificationName: string }> = [];
  @ViewChild('specificationSelect') specificationSelect!: ElementRef;
  @ViewChild('specValueInput') specValueInput!: ElementRef;
  @ViewChild('skuCodeInput') skuCodeInput!: ElementRef;
  @ViewChild('activeCheckbox') activeCheckbox!: ElementRef;
  
  public readonly errorMessage = signal('');
    public readonly successMessage = signal('');
  public readonly isImporting = signal(false);
  public readonly importMessage = signal('');

  constructor(
    private specificationService: SpecificationService,
    private skuService: SkuService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
   ) {}
    ngOnInit(): void {
      this.specificationService.getAllSpecifications().subscribe({
        next: (specs: any[]) => {
          this.specifications = specs.map(s => ({
            specificationId: s.specificationId,
            specificationName: s.specificationName
          }));
       //   console.log('Loaded specifications:', this.specifications);
       this.cdr.detectChanges();
        },
        error: () => {
          this.specifications = [];
        }
      });
    }
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
  skus: any[] = [];

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
  this.isLoadingSkus = true;
  this.skuService.getAllSkus().subscribe({
    next: (skus: any[]) => {
      console.log('API SKUs:', skus); // <-- Add this line
      this.skus = skus;
      this.isLoadingSkus = false;
      this.showSkuGrid = true;
      setTimeout(() => {
        const grid = document.getElementById('sku-grid');
        if (grid) {
          grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    },
    error: (err) => {
      this.isLoadingSkus = false;
      console.error('Error loading SKUs:', err);
    }
  });
}
  exportSkus() {
    this.skuService.getAllSkus().subscribe({
      next: (skus: any[]) => {

        if (skus.length === 0) {
          this.errorMessage.set('No SKU data available to export.');
          return;
        }

        this.generateExcelFile(skus);
      },
      error: (err) => {
        console.error('Error exporting SKUs:', err);
      }
    });
  }

    private generateExcelFile(skus: any[]): void {
    try {
      // Prepare data for Excel export
      const exportData = skus.map(sku => ({
        'Specification Name': sku.specificationName,
        'Value': sku.value,
        'SKU Code': sku.skuCode,
        'Status': sku.isActive ? 'Active' : 'Inactive'
      }));

      // Create a new workbook and worksheet
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(exportData);

      // Set column widths for better formatting
      const columnWidths = [
        { wch: 15 }, // Company Code
        { wch: 30 }, // Company Name
        { wch: 40 }, // Company Address
        { wch: 15 }, // Currency Value
      ];
      worksheet['!cols'] = columnWidths;

      // Add the worksheet to the workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, 'SKU');

      // Generate filename with current date
      const currentDate = new Date().toISOString().split('T')[0];
      const filename = `SKU_export_${currentDate}.xlsx`;

      // Write and download the file
      XLSX.writeFile(workbook, filename);

      this.successMessage.set(`Successfully exported ${skus.length} SKUs to ${filename}`);
    } catch (error) {
      this.errorMessage.set('Failed to generate Excel file. Please try again.');
      console.error('Excel generation error:', error);
    }
  }

  editSku(sku: any) {
    // TODO: Implement edit SKU logic
  }
  deleteSku(sku: any) {
    const skuId = typeof sku === 'object' ? sku.skuId : sku;
    const currentUser = this.authService.getCurrentUser();
    const userId = currentUser?.id || 0;
    const payload = { skuId, userId };
    this.skuService.deactivateSku(payload).subscribe({
      next: (response: any) => {
        this.successMessage.set('SKU deactivated successfully.');
        this.viewSkus();
      },
      error: (err: any) => {
        this.errorMessage.set('Failed to deactivate SKU.');
        console.error('Deactivate SKU error:', err);
      }
    });
  }
  onAddSku(event: Event) {
    event.preventDefault();
    // Get form values using template reference variables
    const specificationId = Number((this.specificationSelect?.nativeElement?.value) || 0);
    const value = (this.specValueInput?.nativeElement?.value || '').trim();
    const skuCode = (this.skuCodeInput?.nativeElement?.value || '').trim();
    const isActive = !!this.activeCheckbox?.nativeElement?.checked;
    const currentUser = this.authService.getCurrentUser();
    const userId = currentUser?.id || 0;

    // Prepare payload
    const payload = {
      specificationId,
      value,
      skuCode,
      isActive,
      userId
    };

    // Call saveSku API
    this.skuService.saveSku(payload).subscribe({
      next: (response) => {
        // Handle success (show message, reset form, etc.)
        console.log('SKU saved:', response);
      },
      error: (err) => {
        // Handle error (show error message)
        console.error('Error saving SKU:', err);
      }
    });
  }

   public importSkus(): void {
    console.log('Import SKUs clicked');
    // Create hidden file input
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.xlsx,.xls';
    fileInput.style.display = 'none';

    fileInput.onchange = (event: any) => {
      const file = event.target.files[0];
      if (file) {
        this.processExcelFile(file);
      }
    };

    document.body.appendChild(fileInput);
    fileInput.click();
    document.body.removeChild(fileInput);
  }

  private processExcelFile(file: File): void {
    this.isImporting.set(true);
    this.importMessage.set('Processing Excel file...');
    this.errorMessage.set('');

    const reader = new FileReader();
    
    reader.onload = (e: any) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        
        // Get the first worksheet
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        
        // Convert to JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        
        this.validateAndImportData(jsonData as any[][]);
      } catch (error) {
        this.isImporting.set(false);
        this.errorMessage.set('Failed to read Excel file. Please ensure it is a valid Excel file.');
        console.error('Excel processing error:', error);
      }
    };

    reader.onerror = () => {
      this.isImporting.set(false);
      this.errorMessage.set('Failed to read the selected file.');
    };

    reader.readAsArrayBuffer(file);
  }

  private validateAndImportData(data: any[][]): void {
    if (data.length < 2) {
      this.isImporting.set(false);
      this.errorMessage.set('Excel file must contain at least one header row and one data row.');
      return;
    }
    console.log('import clicked');
    const headers = data[0];
    const dataRows = data.slice(1);

    // Expected header names (case-insensitive)
    const expectedHeaders = ['Specification ID', 'Value', 'SKU Code', 'Status'];
    const actualHeaders = headers.map((h: string) => h.toString().toLowerCase().trim());

    // Validate that there's at least one data row
    if (dataRows.length === 0) {
      this.isImporting.set(false);
      this.errorMessage.set('Excel file must contain at least one data row.');
      console.log('Excel file must contain at least one data row.');
      return;
    }

    // Convert data rows to company DTOs
  const Skus: any[] = [];
    const errors: string[] = [];

    dataRows.forEach((row, index) => {
      const rowNumber = index + 2; // +2 because index starts at 0 and we skip header row

      // If row is an array, map by index
      // Assuming columns: [SpecificationId, Value, SkuCode, Status, ...]
      const specificationId = row[0];
      const value = row[1];
      const skuCode = row[2];
      const status = row[3];

      let isActive = false;
      if (status !== undefined && status !== null) {
        const s = status.toString().toLowerCase().trim();
        isActive = (s === 'true' || s === 'active' || s === '1');
      }
      Skus.push({
        specificationId: specificationId,
        value: value,
        skuCode: skuCode,
        userId: 0,
        isActive: isActive
      });
    });


  this.importMessage.set(`Importing ${Skus.length} SKUs...`);
  this.sendBulkImportRequest(Skus);
  }

  private sendBulkImportRequest(Skus: any[]): void {
    console.log('Bulk import payload:', Skus);
    this.skuService.bulkImportSkus(Skus).subscribe({
      next: (response: BulkImportResponse) => {
        this.isImporting.set(false);
        this.importMessage.set('');
        
        if (response.success) {
          this.successMessage.set(
            `Successfully imported ${response.successfulRecords} out of ${response.totalRecords} SKUs.`
          );
          
          if (response.failedRecords > 0) {
            this.errorMessage.set(
              `${response.failedRecords} records failed to import. ${response.errors?.join(', ') || ''}`
            );
          }
        } else {
          this.errorMessage.set(response.message || 'Import failed due to server error.');
        }
      },
      error: (error: any) => {
        this.isImporting.set(false);
        this.importMessage.set('');
        let details = '';
        if (error.error) {
          details = JSON.stringify(error.error);
        }
        this.errorMessage.set(
          (error.error?.message || 'Import failed. Please check your connection and try again.') + (details ? '\nDetails: ' + details : '')
        );
        console.error('Bulk import error:', error);
      }
    });
  }


}