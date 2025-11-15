import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService, UserProfile } from '../../../../services/auth.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userProfile: UserProfile | null = null;
  errorMessage: string = '';

  isNewUserPanelExpanded = false;
  isUsersPanelExpanded = false;
  showUsersGrid = false;
  users: any[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  toggleNewUserPanel() {
    this.isNewUserPanelExpanded = !this.isNewUserPanelExpanded;
  }

  toggleUsersPanel() {
    this.isUsersPanelExpanded = !this.isUsersPanelExpanded;
  }

  viewAllUsers() {
    this.showUsersGrid = true;
    // Simulate API call for users
    this.users = [
      {
        id: 1,
        username: 'admin',
        email: 'admin@example.com',
        firstName: 'Admin',
        lastName: 'User',
        createdAt: new Date('2023-01-01'),
        status: 'Active',
        defaultCompany: 'NanoSoft',
        defaultBranch: 'Main',
      },
      {
        id: 2,
        username: 'jdoe',
        email: 'jdoe@example.com',
        firstName: 'John',
        lastName: 'Doe',
        createdAt: new Date('2024-03-15'),
        status: 'Inactive',
        defaultCompany: 'NanoSoft',
        defaultBranch: 'Branch A',
      }
    ];
  }

  editUser(user: any) {
    // Implement edit logic
    alert('Edit user: ' + user.username);
  }

  deleteUser(user: any) {
    // Implement delete logic
    alert('Delete user: ' + user.username);
  }

  private loadUserProfile(): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.userProfile = currentUser;
    }
    this.authService.getUserProfile().subscribe({
      next: (profile) => {
        this.userProfile = profile;
        this.errorMessage = '';
      },
      error: (error) => {
        console.error('Failed to load user profile:', error);
        this.errorMessage = 'Failed to load user profile. Please try again.';
        if (!this.userProfile && currentUser) {
          this.userProfile = currentUser;
          this.errorMessage = '';
        }
      }
    });
  }
}