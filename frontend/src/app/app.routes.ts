import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/components/login/login.component';
import { DashboardComponent } from './features/dashboard/components/dashboard.component';
import { HomePageComponent } from './pages/home/home-page/home-page.component';
import { CompanyPageComponent } from './features/company/components/company-page/company-page.component';
import { RegionComponent } from './features/configuration/components/region/region.component';
import { CountryComponent } from './features/configuration/components/country/country.component';
import { BranchComponent } from './features/configuration/components/branch/branch.component';
import { CategoryComponent } from './features/configuration/components/category/category.component';
import { SkuComponent } from './features/configuration/components/sku/sku.component';
import { ItemSpecificationComponent } from './features/configuration/components/item-specification/item-specification.component';
import { LabelGenerationComponent } from './features/configuration/components/label-generation/label-generation.component';
import { authGuard } from './guards/auth.guard';
import { loginGuard } from './guards/login.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [loginGuard]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
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
        path: 'configuration/country',
        component: CountryComponent
      },
      {
        path: 'configuration/region',
        component: RegionComponent
      },
      {
        path: 'configuration/branch',
        component: BranchComponent
      },
      {
        path: 'configuration/category',
        component: CategoryComponent
      },
      {
        path: 'configuration/sku',
        component: SkuComponent
      },
      {
        path: 'configuration/item-specification',
        component: ItemSpecificationComponent
      },
      {
        path: 'configuration/label-generation',
        component: LabelGenerationComponent
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
