import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customized-views',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './CustomizedViews.component.html',
  styleUrls: ['./CustomizedViews.component.css']
})
export class CustomizedViewsComponent {
  constructor() { }
}