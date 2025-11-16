import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { KeyValuesService } from '../../../../services/key-values.service';
import { LabelsService } from '../../../../services/labels.service';

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
  providers: [KeyValuesService],
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
  constructor(private fb: FormBuilder, private keyValuesService: KeyValuesService, private labelsService: LabelsService) {
    this.labelForm = this.fb.group({
      labelType: ['Container', Validators.required],
      LatestContainerNumber: [{ value: '', disabled: true }],
      latestItemNumber: [{ value: '', disabled: true }],
      labelStatus: [{ value: 'Created', disabled: true }],
      containerNumbers: [''],
      itemNumbers: [''],
      action: ['']
    });
    this.labelForm.get('labelType')?.valueChanges.subscribe((value) => {
    if (value === 'Container') {
      this.keyValuesService.getAllContainerIds().subscribe(ids => {
        this.labelForm.patchValue({ LatestContainerNumber: ids.length ? ids[ids.length - 1] : '', latestItemNumber: '' });
      });
    } else if (value === 'Item') {
      this.keyValuesService.getAllItemIds().subscribe(ids => {
        this.labelForm.patchValue({ latestItemNumber: ids.length ? ids[ids.length - 1] : '', LatestContainerNumber: '' });
      });
    }
  });
  }

  ngOnInit(): void {
    // On page load, fetch and bind latest container number
  this.keyValuesService.getAllContainerIds().subscribe(ids => {
    this.labelForm.patchValue({ LatestContainerNumber: ids.length ? ids[ids.length - 1] : '' });
  });
  }

  labelPanelExpanded = true;

  toggleLabelPanel() {
    this.labelPanelExpanded = !this.labelPanelExpanded;
  }

  isLabelPanelExpanded() {
    return this.labelPanelExpanded;
  }
  onGeneratePrint() {
    const formValue = this.labelForm.getRawValue();
    const payload = {
      labelType: formValue.labelType,
      containerNumbers: Number(formValue.containerNumbers) || 0,
      itemNumbers: Number(formValue.itemNumbers) || 0,
      status: formValue.action,
      userId: 1 // Replace with actual userId from auth context
    };
    const action = (formValue.action || '').toLowerCase();
    if (action === 'download' || action === 'print' || action === 'generate_and_print') {
      this.labelsService.downloadLabelsPdf(payload).subscribe({
        next: (blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'barcodes.pdf';
          a.click();
          window.URL.revokeObjectURL(url);
        },
        error: (err) => {
          alert('Failed to download PDF.');
          console.error(err);
        }
      });
    } else {
      this.labelsService.generateLabels(payload).subscribe({
        next: (result) => {
          alert('Labels generated successfully!');
        },
        error: (err) => {
          alert('Failed to generate labels.');
          console.error(err);
        }
      });
    }
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
