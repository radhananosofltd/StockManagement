import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-label-generation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './label-generation.component.html',
  styleUrls: ['./label-generation.component.css']
})
export class LabelGenerationComponent {
  title = 'Label Generation Configuration';
}