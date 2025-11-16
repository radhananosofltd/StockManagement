import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

interface LabelGeneration {
  id: number;
  labelType: string;
  labelValue: string;
  status: string;
}

@Component({
  selector: 'app-label-generation',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './label-generation.component.html',
  styleUrl: './label-generation.component.css'
})
export class LabelGenerationComponent implements OnInit {
  // Signals for panel expansion states
  isLabelQuickActionsPanelExpanded = signal(false);

  // Signals for UI states
  showLabelsGrid = signal(false);
  isLoadingLabels = signal(false);
  labels = signal<LabelGeneration[]>([]);

  currentLabelPage = signal(1);
  labelsPerPage = 10;

  // Toggle Quick Actions panel
  toggleLabelQuickActionsPanel() {
    this.isLabelQuickActionsPanelExpanded.set(!this.isLabelQuickActionsPanelExpanded());
  }

  onExportLabels() {
    // TODO: Implement export labels logic
    alert('Export Labels clicked');
  }

  onViewAllLabels() {
    this.showLabelsGrid.set(true);
    this.isLoadingLabels.set(true);
    // Simulate API call
    setTimeout(() => {
      // Replace with actual API call
      this.labels.set([
        { id: 1, labelType: 'Container', labelValue: 'C-1001', status: 'Active' },
        { id: 2, labelType: 'Item', labelValue: 'I-2002', status: 'Inactive' }
      ]);
      this.isLoadingLabels.set(false);
    }, 1000);
  }

  onCloseLabelsGrid() {
    this.showLabelsGrid.set(false);
  }

  get pagedLabels() {
    const page = this.currentLabelPage();
    const start = (page - 1) * this.labelsPerPage;
    const end = start + this.labelsPerPage;
    return this.labels().slice(start, end);
  }

  get totalLabelPages() {
    return Math.ceil(this.labels().length / this.labelsPerPage);
  }

  setLabelPage(page: number) {
    this.currentLabelPage.set(page);
  }
  labelForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.labelForm = this.fb.group({
      labelType: ['Container', Validators.required],
      LatestContainerNumber: [{ value: '', disabled: true }],
      latestItemNumber: [{ value: '', disabled: true }],
      labelStatus: [{ value: 'Created', disabled: true }]
    });
  }

  ngOnInit(): void {
    // Load initial data if needed
  }

  labelPanelExpanded = true;

  toggleLabelPanel() {
    this.labelPanelExpanded = !this.labelPanelExpanded;
  }

  isLabelPanelExpanded() {
    return this.labelPanelExpanded;
  }
  onGeneratePrint() {
    // Generate and print label logic
  }

  onPrintLabel() {
    // Print label logic
  }

  onReset() {
    this.labelForm.reset({ labelType: 'Container', lastPrintedLabel: '', labelStatus: 'Created' });
  }

  // Removed duplicate and non-signal methods
  onEditLabel(label: LabelGeneration) {
    // Edit label logic
  }

  onDeleteLabel(label: LabelGeneration) {
    // Delete label logic
  }

  onPrintLabelRow(label: LabelGeneration) {
    // Print label from grid logic
  }
}
