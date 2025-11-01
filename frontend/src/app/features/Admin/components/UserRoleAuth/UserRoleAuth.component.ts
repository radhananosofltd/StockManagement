import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-role-auth',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './UserRoleAuth.component.html',
  styleUrls: ['./UserRoleAuth.component.css']
})
export class UserRoleAuthComponent {
  constructor() { }
}