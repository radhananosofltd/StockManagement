import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-backup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './Backup.component.html',
  styleUrls: ['./Backup.component.css']
})
export class BackupComponent {
  constructor() { }
}