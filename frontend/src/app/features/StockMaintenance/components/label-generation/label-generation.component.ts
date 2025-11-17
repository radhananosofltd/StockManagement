import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { KeyValuesService } from '../../../../services/key-values.service';
import { LabelsService } from '../../../../services/labels.service';

interface LabelGeneration {
  id: number;
  labelType: string;
  itemId: string;
  containerId: string;
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
    this.labelsService.getAllLabels().subscribe({
      next: (result) => {
        // Prepare CSV header
        const header = ['Label Type', 'Label Value', 'Status'];
        // Prepare rows
        const rows = result.map(label => [
          label.labelType,
          label.containerId ? label.containerId : label.itemId,
          label.status
        ]);
        // Convert to CSV string
        const currentDate = new Date().toISOString().split('T')[0];

        const csvContent = [header, ...rows].map(e => e.join(',')).join('\n');
        // Download as .csv file
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `labels_export_${currentDate}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        alert('Failed to export labels');
        console.error(err);
      }
    });
  }

  onViewAllLabels() {
    this.showLabelsGrid.set(true);
    this.isLoadingLabels.set(true);
    this.labelsService.getAllLabels().subscribe({
      next: (result) => {
        console.log('Labels API response:', result);
        this.labels.set(result);
        this.isLoadingLabels.set(false);
      },
      error: (err) => {
        this.labels.set([]);
        this.isLoadingLabels.set(false);
        alert('Failed to load labels');
        console.error(err);
      }
    });
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
      this.labelForm.get('LatestContainerNumber')?.enable();
      this.labelForm.get('latestItemNumber')?.enable();
      this.keyValuesService.getAllContainerIds().subscribe(ids => {
        this.labelForm.patchValue({ LatestContainerNumber: ids.length ? ids[ids.length - 1] : '', latestItemNumber: '' });
      });
    } else if (value === 'Item') {
      this.labelForm.get('LatestContainerNumber')?.disable();
      this.labelForm.get('latestItemNumber')?.enable();    
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
      // Update label status to inactive (is_active = 0)
      const updatedLabel = { ...label, status: 'Inactive' };
      // Call backend API to update status
      this.labelsService.updateLabelStatus(label.id, 0).subscribe({
        next: () => {
          // Update local grid
          this.labels.set(
            this.labels().map(l =>
              l.id === label.id ? { ...l, status: 'Inactive' } : l
            )
          );
          alert('Label deleted (set inactive) successfully.');
        },
        error: (err) => {
          alert('Failed to delete label.');
          console.error(err);
        }
      });
  }

  onPrintLabelRow(label: LabelGeneration) {
    // Call backend to get PDF for this label
    this.labelsService.downloadLabelPdf(label.id).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `label_${label.id}_barcodes.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        alert('Failed to download label PDF.');
        console.error(err);
      }
    });
  }
}
