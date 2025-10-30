import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

interface MenuItem {
  label: string;
  icon: string;
  route: string;
  active?: boolean;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <aside class="sidebar">
      <div class="sidebar-header">
        <div class="logo">
          <svg class="logo-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
          </svg>
          <span class="logo-text">StockMgmt</span>
        </div>
      </div>

      <nav class="sidebar-nav">
        <div class="nav-section">
          <h3 class="nav-section-title">Menu</h3>
          <ul class="nav-list">
            <li class="nav-item">
              <a 
                routerLink="/dashboard/home" 
                routerLinkActive="active"
                class="nav-link"
              >
                <svg class="nav-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                </svg>
                <span class="nav-text">Dashboard</span>
              </a>
            </li>
            <li class="nav-item">
              <a 
                routerLink="/dashboard/company" 
                routerLinkActive="active"
                class="nav-link"
              >
                <svg class="nav-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/>
                </svg>
                <span class="nav-text">Company</span>
              </a>
            </li>
            <li class="nav-item">
              <a 
                routerLink="/dashboard/stocks" 
                routerLinkActive="active"
                class="nav-link"
              >
                <svg class="nav-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
                </svg>
                <span class="nav-text">Stocks</span>
              </a>
            </li>
            <li class="nav-item">
              <a 
                routerLink="/dashboard/reports" 
                routerLinkActive="active"
                class="nav-link"
              >
                <svg class="nav-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
                </svg>
                <span class="nav-text">Reports</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <div class="sidebar-footer">
        <div class="user-info">
          <div class="user-avatar">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>
          <div class="user-details">
            <span class="user-name">Admin User</span>
            <span class="user-role">Administrator</span>
          </div>
        </div>
      </div>
    </aside>
  `,
  styles: [`
    .sidebar {
      width: 280px;
      background: linear-gradient(180deg, #1e293b 0%, #334155 100%);
      color: white;
      display: flex;
      flex-direction: column;
      box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
      position: relative;
    }

    .sidebar-header {
      padding: 2rem 1.5rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .logo-icon {
      width: 2rem;
      height: 2rem;
      color: #60a5fa;
    }

    .logo-text {
      font-size: 1.5rem;
      font-weight: 700;
      color: white;
    }

    .sidebar-nav {
      flex: 1;
      padding: 1.5rem 0;
    }

    .nav-section {
      margin-bottom: 2rem;
    }

    .nav-section-title {
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: #94a3b8;
      margin: 0 0 1rem 1.5rem;
    }

    .nav-list {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .nav-item {
      margin-bottom: 0.25rem;
    }

    .nav-link {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.875rem 1.5rem;
      color: #cbd5e1;
      text-decoration: none;
      transition: all 0.2s ease;
      border-left: 3px solid transparent;
      position: relative;
    }

    .nav-link:hover {
      background: rgba(255, 255, 255, 0.1);
      color: white;
      border-left-color: #60a5fa;
    }

    .nav-link.active {
      background: rgba(96, 165, 250, 0.15);
      color: #60a5fa;
      border-left-color: #60a5fa;
      font-weight: 600;
    }

    .nav-link.active::before {
      content: '';
      position: absolute;
      right: 1.5rem;
      top: 50%;
      transform: translateY(-50%);
      width: 6px;
      height: 6px;
      background: #60a5fa;
      border-radius: 50%;
    }

    .nav-icon {
      width: 1.25rem;
      height: 1.25rem;
      flex-shrink: 0;
    }

    .nav-text {
      font-size: 0.95rem;
    }

    .sidebar-footer {
      padding: 1.5rem;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      margin-top: auto;
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .user-avatar {
      width: 2.5rem;
      height: 2.5rem;
      background: rgba(96, 165, 250, 0.2);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .user-avatar svg {
      width: 1.5rem;
      height: 1.5rem;
      color: #60a5fa;
    }

    .user-details {
      display: flex;
      flex-direction: column;
      gap: 0.125rem;
    }

    .user-name {
      font-size: 0.875rem;
      font-weight: 600;
      color: white;
    }

    .user-role {
      font-size: 0.75rem;
      color: #94a3b8;
    }

    @media (max-width: 768px) {
      .sidebar {
        width: 240px;
      }

      .logo-text {
        font-size: 1.25rem;
      }

      .nav-link {
        padding: 0.75rem 1rem;
      }

      .sidebar-header,
      .sidebar-footer {
        padding: 1.5rem 1rem;
      }
    }

    @media (max-width: 640px) {
      .sidebar {
        position: fixed;
        top: 0;
        left: 0;
        height: 100vh;
        z-index: 1000;
        transform: translateX(-100%);
        transition: transform 0.3s ease;
      }

      .sidebar.open {
        transform: translateX(0);
      }
    }
  `]
})
export class SidebarComponent {
  constructor(private router: Router) {}
}