import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar.component';
import { AuthService, User } from './services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, CommonModule],
  template: `
    <div class="dashboard-container">
      <app-sidebar></app-sidebar>
      <main class="main-content">
        <div class="content-header">
          <div class="header-left">
            <h1>Stock Management System</h1>
            <p>Welcome to your stock management dashboard</p>
          </div>
          <div class="header-right" *ngIf="currentUser">
            <div class="user-info">
              <span class="user-name">{{ userFullName }}</span>
              <button class="logout-btn" (click)="onLogout()">
                <svg class="logout-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C10.9 2 10 2.9 10 4V8C10 9.1 10.9 10 12 10C13.1 10 14 9.1 14 8V4C14 2.9 13.1 2 12 2Z"/>
                  <path d="M20.485 6.929C19.707 6.151 18.464 6.151 17.686 6.929C16.908 7.707 16.908 8.95 17.686 9.728C18.928 11.002 19.714 12.676 19.714 14.571C19.714 18.896 16.325 22.286 12 22.286C7.675 22.286 4.286 18.896 4.286 14.571C4.286 12.676 5.072 11.002 6.314 9.728C7.092 8.95 7.092 7.707 6.314 6.929C5.536 6.151 4.293 6.151 3.515 6.929C1.286 9.157 0 12.243 0 15.714C0 21.239 4.475 25.714 10 25.714H14C19.525 25.714 24 21.239 24 15.714C24 12.243 22.714 9.157 20.485 6.929Z"/>
                </svg>
                Logout
              </button>
            </div>
          </div>
        </div>
        <div class="content-body">
          <router-outlet></router-outlet>
        </div>
      </main>
    </div>
  `,
  styles: [`
    .dashboard-container {
      display: flex;
      min-height: 100vh;
      background: #f8fafc;
    }

    .main-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    .content-header {
      background: white;
      padding: 2rem 3rem;
      border-bottom: 1px solid #e2e8f0;
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .header-left {
      flex: 1;
    }

    .header-right {
      display: flex;
      align-items: center;
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .user-name {
      font-weight: 600;
      color: #374151;
      font-size: 1rem;
    }

    .logout-btn {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      background: #ef4444;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 0.875rem;
      font-weight: 500;
      transition: background 0.2s ease;
    }

    .logout-btn:hover {
      background: #dc2626;
    }

    .logout-icon {
      width: 1rem;
      height: 1rem;
      display: inline-block;
    }

    .content-header h1 {
      font-size: 2rem;
      font-weight: 700;
      color: #1a202c;
      margin: 0 0 0.5rem 0;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .content-header p {
      color: #64748b;
      margin: 0;
      font-size: 1.1rem;
    }

    .content-body {
      flex: 1;
      padding: 2rem 3rem;
      overflow-y: auto;
    }

    @media (max-width: 768px) {
      .content-header {
        padding: 1.5rem 2rem;
        flex-direction: column;
        gap: 1rem;
        align-items: stretch;
      }

      .header-right {
        justify-content: flex-end;
      }

      .content-header h1 {
        font-size: 1.75rem;
      }

      .content-body {
        padding: 1.5rem 2rem;
      }
    }

    @media (max-width: 640px) {
      .content-header {
        padding: 1rem 1.5rem;
      }

      .content-header h1 {
        font-size: 1.5rem;
      }

      .content-body {
        padding: 1rem 1.5rem;
      }
    }
  `]
})
export class DashboardComponent implements OnInit {
  currentUser: User | null = null;
  userFullName: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      this.userFullName = this.authService.getFullUserName();
    });
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}