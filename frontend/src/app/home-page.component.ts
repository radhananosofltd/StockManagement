import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="home-page">
      <div class="welcome-section">
        <h2>Welcome to Stock Management System</h2>
        <p>Manage your stock portfolio with ease and efficiency</p>
      </div>

      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon companies">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/>
            </svg>
          </div>
          <div class="stat-content">
            <h3>0</h3>
            <p>Companies</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon stocks">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
            </svg>
          </div>
          <div class="stat-content">
            <h3>0</h3>
            <p>Active Stocks</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon portfolio">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
          <div class="stat-content">
            <h3>$0</h3>
            <p>Portfolio Value</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon reports">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
            </svg>
          </div>
          <div class="stat-content">
            <h3>0</h3>
            <p>Reports Generated</p>
          </div>
        </div>
      </div>

      <div class="actions-section">
        <h3>Quick Actions</h3>
        <div class="actions-grid">
          <a routerLink="/dashboard/company" class="action-card">
            <div class="action-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
              </svg>
            </div>
            <div class="action-content">
              <h4>Add Company</h4>
              <p>Register a new company in your portfolio</p>
            </div>
          </a>

          <div class="action-card">
            <div class="action-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
              </svg>
            </div>
            <div class="action-content">
              <h4>Track Stocks</h4>
              <p>Monitor stock performance and trends</p>
            </div>
          </div>

          <div class="action-card">
            <div class="action-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
              </svg>
            </div>
            <div class="action-content">
              <h4>View Reports</h4>
              <p>Generate detailed portfolio reports</p>
            </div>
          </div>
        </div>
      </div>

      <div class="recent-activity">
        <h3>Recent Activity</h3>
        <div class="activity-list">
          <div class="activity-item">
            <div class="activity-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <div class="activity-content">
              <p><strong>System Initialized</strong></p>
              <span>Welcome to your new Stock Management System</span>
            </div>
            <div class="activity-time">
              Just now
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .home-page {
      max-width: 1200px;
      margin: 0 auto;
    }

    .welcome-section {
      margin-bottom: 3rem;
    }

    .welcome-section h2 {
      font-size: 2.25rem;
      font-weight: 700;
      color: #1a202c;
      margin: 0 0 0.75rem 0;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .welcome-section p {
      color: #64748b;
      font-size: 1.2rem;
      margin: 0;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
      margin-bottom: 3rem;
    }

    .stat-card {
      background: white;
      border-radius: 16px;
      padding: 2rem;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      display: flex;
      align-items: center;
      gap: 1.5rem;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .stat-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1);
    }

    .stat-icon {
      width: 4rem;
      height: 4rem;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .stat-icon svg {
      width: 2rem;
      height: 2rem;
    }

    .stat-icon.companies {
      background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
      color: white;
    }

    .stat-icon.stocks {
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      color: white;
    }

    .stat-icon.portfolio {
      background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
      color: white;
    }

    .stat-icon.reports {
      background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
      color: white;
    }

    .stat-content h3 {
      font-size: 2rem;
      font-weight: 700;
      color: #1a202c;
      margin: 0 0 0.25rem 0;
    }

    .stat-content p {
      color: #64748b;
      font-size: 0.875rem;
      font-weight: 500;
      margin: 0;
    }

    .actions-section {
      margin-bottom: 3rem;
    }

    .actions-section h3 {
      font-size: 1.5rem;
      font-weight: 600;
      color: #1a202c;
      margin: 0 0 1.5rem 0;
    }

    .actions-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
    }

    .action-card {
      background: white;
      border-radius: 16px;
      padding: 2rem;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      display: flex;
      align-items: flex-start;
      gap: 1.5rem;
      transition: all 0.2s ease;
      text-decoration: none;
      color: inherit;
      cursor: pointer;
    }

    .action-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1);
      text-decoration: none;
      color: inherit;
    }

    .action-icon {
      width: 3rem;
      height: 3rem;
      background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .action-icon svg {
      width: 1.5rem;
      height: 1.5rem;
      color: #475569;
    }

    .action-content h4 {
      font-size: 1.125rem;
      font-weight: 600;
      color: #1a202c;
      margin: 0 0 0.5rem 0;
    }

    .action-content p {
      color: #64748b;
      margin: 0;
      line-height: 1.5;
    }

    .recent-activity h3 {
      font-size: 1.5rem;
      font-weight: 600;
      color: #1a202c;
      margin: 0 0 1.5rem 0;
    }

    .activity-list {
      background: white;
      border-radius: 16px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }

    .activity-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1.5rem 2rem;
      border-bottom: 1px solid #f1f5f9;
    }

    .activity-item:last-child {
      border-bottom: none;
    }

    .activity-icon {
      width: 2.5rem;
      height: 2.5rem;
      background: linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 100%);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .activity-icon svg {
      width: 1.25rem;
      height: 1.25rem;
      color: #10b981;
    }

    .activity-content {
      flex: 1;
    }

    .activity-content p {
      margin: 0 0 0.25rem 0;
      color: #1a202c;
    }

    .activity-content span {
      color: #64748b;
      font-size: 0.875rem;
    }

    .activity-time {
      color: #94a3b8;
      font-size: 0.875rem;
      font-weight: 500;
    }

    @media (max-width: 768px) {
      .welcome-section h2 {
        font-size: 1.875rem;
      }

      .stats-grid {
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
      }

      .stat-card {
        padding: 1.5rem;
      }

      .actions-grid {
        grid-template-columns: 1fr;
      }

      .action-card {
        padding: 1.5rem;
      }

      .activity-item {
        padding: 1.25rem 1.5rem;
      }
    }
  `]
})
export class HomePageComponent {}