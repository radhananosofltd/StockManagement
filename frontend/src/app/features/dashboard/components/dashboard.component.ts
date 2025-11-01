import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent],
  template: `
    <div class="dashboard-container">
      <app-sidebar></app-sidebar>
      <main class="main-content">
        <div class="content-header">
          <h1>Stock Management System</h1>
          <p>Welcome to your stock management dashboard</p>
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
export class DashboardComponent {}