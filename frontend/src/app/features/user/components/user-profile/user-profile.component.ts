import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService, UserProfile } from '../../../../services/auth.service';
import { CompanyService, CompanyListDTO } from '../../../../services/company.service';
import { BranchService, BranchDTO } from '../../../../services/branch.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {     
      isActive: boolean = false;
    headerTitle: string = 'New User';
  userProfile: UserProfile | null = null;
  isEditMode: boolean = false;
  errorMessage: string = '';

  isNewUserPanelExpanded = false;
  isUsersPanelExpanded = false;
  showUsersPanel = true;
  showUsersGrid = false;
  users: any[] = [];

  companies: CompanyListDTO[] = [];
  branches: BranchDTO[] = [];

  constructor(
    private authService: AuthService,
    private companyService: CompanyService,
    private branchService: BranchService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
        // Fetch all companies for the dropdown
        this.companyService.getCompanies().subscribe({
          next: (companies) => {
            this.companies = companies;
          },
          error: (err) => {
            this.companies = [];
          }
        });

        // Fetch all branches for the dropdown
        this.branchService.getBranches().subscribe({
          next: (branches) => {
            this.branches = branches;
          },
          error: (err) => {
            this.branches = [];
          }
        });
    this.route.paramMap.subscribe(params => {
      const userId = params.get('id');
      const currentUrl = window.location.pathname;
      if (userId) {
        this.isEditMode = true;
        this.headerTitle = 'User Details';
        this.showUsersPanel = false;
        this.loadUserDetails(userId);
          if (this.userProfile) this.isActive = !!this.userProfile.isActive;
      } else {
        this.isEditMode = false;
        if (currentUrl.endsWith('/profile')) {
          this.headerTitle = 'User Details';
          this.showUsersPanel = false;
          this.loadUserProfile();
            if (this.userProfile) this.isActive = !!this.userProfile.isActive;
        } else {
          this.headerTitle = 'New User';
          this.showUsersPanel = true;
          this.clearUserForm();
            this.isActive = false;
        }
      }
    });
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

  onSubmit(form: any): void {
    if (!this.userProfile) return;
    // Collect all data from the form fields
    const updatedUser = {
      ...this.userProfile,
      username: form.value.username,
      email: form.value.email,
      password: form.value.password,
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      defaultCompanyId: form.value.defaultCompany,
      defaultBranchId: form.value.defaultBranch,
      roleId: form.value.role,
      isActive: this.isActive
    };
    this.authService.updateUser(updatedUser).subscribe({
      next: (res) => {
        alert('User updated successfully!');
      },
      error: (err) => {
        alert('Failed to update user.');
      }
    });
  }
      
  editUser(user: any) {
    // Navigate to user-profile/:id to load user details for editing
    // (Assumes routerLink or router.navigate is used in template/menu)
    window.location.href = `/user-profile/${user.id}`;
  }
  private loadUserDetails(userId: string): void {
    // Replace with actual API call to fetch user by ID
    // For now, simulate with dummy data or fetch from users array
    const user = this.users.find(u => u.id.toString() === userId);
    if (user) {
      this.userProfile = user;
    } else {
      // Optionally, fetch from API
      this.userProfile = null;
    }
  }

  private clearUserForm(): void {
    this.userProfile = null;
    // Optionally, reset form controls if using reactive forms
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