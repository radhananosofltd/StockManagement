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
  labelForm: FormGroup;
  labels: LabelGeneration[] = [];
  showLabelsGrid = false;
  formExpanded = true;
  quickActionsExpanded = true;

  constructor(private fb: FormBuilder) {
    this.labelForm = this.fb.group({
      labelType: ['Container', Validators.required],
      lastPrintedLabel: [{ value: '', disabled: true }],
      labelStatus: [{ value: 'Created', disabled: true }]
    });
  }

  ngOnInit(): void {
    // Load initial data if needed
  }

  toggleFormPanel() {
    this.formExpanded = !this.formExpanded;
  }

  isFormExpanded() {
    return this.formExpanded;
  }

  toggleQuickActionsPanel() {
    this.quickActionsExpanded = !this.quickActionsExpanded;
  }

  isQuickActionsExpanded() {
    return this.quickActionsExpanded;
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

  onViewAllLabels() {
    this.showLabelsGrid = true;
    // Load all labels logic
  }

  onEditLabel(label: LabelGeneration) {
    // Edit label logic
  }

  onDeleteLabel(label: LabelGeneration) {
    // Delete label logic
  }

  onPrintLabelRow(label: LabelGeneration) {
    // Print label from grid logic
  }

  onCloseLabelsGrid() {
    this.showLabelsGrid = false;
  }
}
