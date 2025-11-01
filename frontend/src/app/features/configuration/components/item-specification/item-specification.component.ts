import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-item-specification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item-specification.component.html',
  styleUrls: ['./item-specification.component.css']
})
export class ItemSpecificationComponent {
  title = 'Item Specification Configuration';
}