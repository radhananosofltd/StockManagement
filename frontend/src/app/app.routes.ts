import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { HomePageComponent } from './home-page.component';
import { CompanyPageComponent } from './company-page.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard/home',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: HomePageComponent
      },
      {
        path: 'company',
        component: CompanyPageComponent
      },
      {
        path: 'stocks',
        component: HomePageComponent // Placeholder for now
      },
      {
        path: 'reports',
        component: HomePageComponent // Placeholder for now
      }
    ]
  }
];
