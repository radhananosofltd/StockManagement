import { Component } from '@angular/core';
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
export class InwardComponent {
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
  categories = [
    { id: 'cat1', name: 'Laptop' },
    { id: 'cat2', name: 'Monitor' },
    { id: 'cat3', name: 'Printer' }
  ];
  containers = [
    { id: 'cont1', name: 'Generate' },
    { id: 'cont2', name: 'C0001' },
    { id: 'cont3', name: 'C0002' }
  ];
  items = [
    { id: 'item1', name: 'Generate' },
    { id: 'item2', name: 'I0001' },
    { id: 'item3', name: 'I0002' }
  ];

  // Specification grid
  specifications: string[] = [
    'Brand', 'Model', 'Color', 'Speed', 'Processor', 'Core', 'Keyboard Type', 'Battery', 'Mouse Type', 'Language'
  ];
  containerId: string = '';
  itemId: string = '';
  specValues: { [key: string]: string } = {};
  specChecked: { [key: string]: boolean } = {};

  // Stub for ng-select options per specification
  getSpecOptions(spec: string) {
    // Replace with actual options per specification as needed
    return [
      { id: spec + '1', name: spec + ' Option 1' },
      { id: spec + '2', name: spec + ' Option 2' },
      { id: spec + '3', name: spec + ' Option 3' }
    ];
  }
}