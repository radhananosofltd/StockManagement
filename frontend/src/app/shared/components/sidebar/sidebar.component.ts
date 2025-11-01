import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';

interface MenuItem {
  label: string;
  icon: string;
  route?: string;
  active?: boolean;
  children?: MenuItem[];
  expanded?: boolean;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  currentUser: any = null;

  menuItems: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: '🏠',
      route: '/dashboard/home'
    },
    {
      label: 'Configuration',
      icon: '⚙️',
      expanded: false,
      children: [
        {
          label: 'Country',
          icon: '🌍',
          route: '/dashboard/configuration/country'
        },
        {
          label: 'Region',
          icon: '🗺️',
          route: '/dashboard/configuration/region'
        },
        {
          label: 'Company',
          icon: '🏢',
          route: '/dashboard/configuration/company-page'
        },
        {
          label: 'Branch',
          icon: '🏢',
          route: '/dashboard/configuration/branch'
        },
        {
          label: 'Category',
          icon: '📂',
          route: '/dashboard/configuration/category'
        },
        {
          label: 'SKU',
          icon: '🏷️',
          route: '/dashboard/configuration/sku'
        },
        {
          label: 'Item Specification',
          icon: '📋',
          route: '/dashboard/configuration/item-specification'
        },
        {
          label: 'Label Generation',
          icon: '🏷️',
          route: '/dashboard/configuration/label-generation'
        }
      ]
    },
    {
      label: 'Stocks',
      icon: '📊',
      route: '/dashboard/stocks'
    },
    {
      label: 'Reports',
      icon: '📈',
      route: '/dashboard/reports'
    }
  ];

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadCurrentUser();
  }

  loadCurrentUser(): void {
    this.currentUser = this.authService.getCurrentUser();
  }

  toggleSubmenu(item: MenuItem): void {
    if (item.children) {
      item.expanded = !item.expanded;
    }
  }

  navigateTo(route: string | undefined): void {
    if (route) {
      this.router.navigate([route]);
    }
  }

  navigateToProfile(): void {
    this.router.navigate(['/dashboard/profile']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  getDisplayName(): string {
    if (this.currentUser?.firstName && this.currentUser?.lastName) {
      return `${this.currentUser.firstName} ${this.currentUser.lastName}`;
    }
    return this.currentUser?.username || 'User';
  }
}