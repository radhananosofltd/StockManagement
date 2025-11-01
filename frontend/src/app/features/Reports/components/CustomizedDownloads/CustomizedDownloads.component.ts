import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customized-downloads',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './CustomizedDownloads.component.html',
  styleUrls: ['./CustomizedDownloads.component.css']
})
export class CustomizedDownloadsComponent {
  constructor() { }
}