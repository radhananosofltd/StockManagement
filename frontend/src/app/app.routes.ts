import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { HomePageComponent } from './home-page.component';
import { CompanyPageComponent } from './company-page.component';
import { LoginComponent } from './login.component';
import { AuthGuard } from './services/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
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
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];
