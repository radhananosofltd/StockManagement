import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inward',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './Inward.component.html',
  styleUrls: ['./Inward.component.css']
})
export class InwardComponent {
        containers = [
          { id: 'cont1', name: 'Container 1' },
          { id: 'cont2', name: 'Container 2' },
          { id: 'cont3', name: 'Container 3' }
        ];

        items = [
          { id: 'item1', name: 'Item 1' },
          { id: 'item2', name: 'Item 2' },
          { id: 'item3', name: 'Item 3' }
        ];
      // Track repeat checkboxes for each cell
      repeatChecked: { [row: number]: { [col: string]: boolean } } = {};

      addGridRow(index: number) {
        const qtyNum = Number(this.qty) || 1;
        if (this.specificationRows.length >= qtyNum) return;
        const newRow: { [key: string]: string } = {};
        const newRepeat: { [col: string]: boolean } = {};
        this.specificationColumns.forEach(col => {
          // If repeat checkbox is checked in previous row, copy value and check new row's box
          if (col !== 'Item ID' && this.repeatChecked[index] && this.repeatChecked[index][col]) {
            newRow[col] = this.specificationRows[index][col];
            newRepeat[col] = true;
          } else {
            newRow[col] = '';
            newRepeat[col] = false;
          }
        });
        this.specificationRows.splice(index + 1, 0, newRow);
        // Shift repeatChecked for rows after the inserted row
        const newRepeatChecked: { [row: number]: { [col: string]: boolean } } = {};
        Object.keys(this.repeatChecked).forEach(key => {
          const k = Number(key);
          newRepeatChecked[k < index + 1 ? k : k + 1] = this.repeatChecked[k];
        });
        newRepeatChecked[index + 1] = newRepeat;
        this.repeatChecked = newRepeatChecked;
      }

      removeGridRow(index: number) {
        if (this.specificationRows.length > 1) {
          this.specificationRows.splice(index, 1);
        }
      }
    onRepeatCell(rowIndex: number, col: string, event: Event) {
      // Track checkbox state for each cell
      const checked = (event.target as HTMLInputElement).checked;
      if (!this.repeatChecked[rowIndex]) this.repeatChecked[rowIndex] = {};
      this.repeatChecked[rowIndex][col] = checked;
    }
  stockInwardPanelExpanded = true;

  toggleStockInwardPanel() {
    this.stockInwardPanelExpanded = !this.stockInwardPanelExpanded;
  }

  isStockInwardPanelExpanded() {
    return this.stockInwardPanelExpanded;
  }
  constructor() { }
    // Form properties
    stockType: string = 'Container';
    category: string = '';
    qty: number | null = null;
    qtyInsideContainer: number | null = null;

    // Dropdown data
    categories = [
      { id: 'cat1', name: 'Electronics' },
      { id: 'cat2', name: 'Furniture' },
      { id: 'cat3', name: 'Apparel' }
    ];

    // Specification grid
    specificationColumns: string[] = [
      'Container ID', 'Item ID', 'Brand', 'Model', 'Color', 'Processor', 'Speed'
    ];
    specificationRows: { [key: string]: string }[] = [
      (() => {
        const row: { [key: string]: string } = {};
        [
          'Container ID', 'Item ID', 'Brand', 'Model', 'Color', 'Processor', 'Speed'
        ].forEach(col => row[col] = '');
        return row;
      })()
    ];

    addStock() {
      // Handle add stock logic here
      console.log('Stock added:', {
        stockType: this.stockType,
        category: this.category,
        qty: this.qty,
        qtyInsideContainer: this.qtyInsideContainer,
        specification: this.specificationRows
      });
      // Reset form after adding if needed
      this.resetForm();
    }

    resetForm() {
      this.stockType = 'Container';
      this.category = '';
      this.qty = null;
      this.qtyInsideContainer = null;
      this.specificationRows = [];
    }

}