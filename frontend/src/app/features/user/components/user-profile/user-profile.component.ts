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

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  private loadUserProfile(): void {
    // First try to get user data from localStorage
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.userProfile = currentUser;
    }

    // Then try to get full profile from API
    this.authService.getUserProfile().subscribe({
      next: (profile) => {
        this.userProfile = profile;
        this.errorMessage = '';
      },
      error: (error) => {
        console.error('Failed to load user profile:', error);
        this.errorMessage = 'Failed to load user profile. Please try again.';
        
        // If API fails but we have cached user data, keep using it
        if (!this.userProfile && currentUser) {
          this.userProfile = currentUser;
          this.errorMessage = '';
        }
      }
    });
  }
}