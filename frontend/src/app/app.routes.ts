import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/components/login/login.component';
import { DashboardComponent } from './features/dashboard/components/dashboard.component';
import { HomePageComponent } from './pages/home/home-page/home-page.component';
import { CompanyPageComponent } from './features/configuration/components/company/company-page.component';
import { RegionComponent } from './features/configuration/components/region/region.component';
import { CountryComponent } from './features/configuration/components/country/country.component';
import { BranchComponent } from './features/configuration/components/branch/branch.component';
import { CategoryComponent } from './features/configuration/components/category/category.component';
import { SkuComponent } from './features/configuration/components/sku/sku.component';
import { ItemSpecificationComponent } from './features/configuration/components/item-specification/item-specification.component';
import { LabelGenerationComponent } from './features/configuration/components/label-generation/label-generation.component';
import { UserProfileComponent } from './features/user/components/user-profile/user-profile.component';
import { UserSetupComponent } from './features/user/components/user-setup/user-setup.component';
// Stock Maintenance Components
import { InwardComponent } from './features/StockMaintenance/components/Inward/Inward.component';
import { OutwardComponent } from './features/StockMaintenance/components/Outward/Outward.component';
import { TransferComponent } from './features/StockMaintenance/components/Transfer/Transfer.component';
import { ConversionComponent } from './features/StockMaintenance/components/Conversion/Conversion.component';
// Reports Components
import { CustomizedViewsComponent } from './features/Reports/components/CustomizedViews/CustomizedViews.component';
import { CustomizedDownloadsComponent } from './features/Reports/components/CustomizedDownloads/CustomizedDownloads.component';
// Admin Components
import { BackupComponent } from './features/Admin/components/Backup/Backup.component';
import { RestoreComponent } from './features/Admin/components/Restore/Restore.component';
import { ArchiveComponent } from './features/Admin/components/Archive/Archive.component';
import { UserRoleAuthComponent } from './features/Admin/components/UserRoleAuth/UserRoleAuth.component';
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
        path: 'configuration/company-page',
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
      // Stock Maintenance Routes
      {
        path: 'stock-maintenance/inward',
        component: InwardComponent
      },
      {
        path: 'stock-maintenance/outward',
        component: OutwardComponent
      },
      {
        path: 'stock-maintenance/transfer',
        component: TransferComponent
      },
      {
        path: 'stock-maintenance/conversion',
        component: ConversionComponent
      },
      // Reports Routes
      {
        path: 'reports/customized-views',
        component: CustomizedViewsComponent
      },
      {
        path: 'reports/customized-downloads',
        component: CustomizedDownloadsComponent
      },
      // Admin Routes
      {
        path: 'admin/backup',
        component: BackupComponent
      },
      {
        path: 'admin/restore',
        component: RestoreComponent
      },
      {
        path: 'admin/archive',
        component: ArchiveComponent
      },
      {
        path: 'admin/user-role-auth',
        component: UserRoleAuthComponent
      },
      {
        path: 'admin/user-setup',
        component: UserSetupComponent
      },
      {
        path: 'profile',
        component: UserProfileComponent
      },
      {
        path: 'admin/user-profile',
        component: UserProfileComponent
      }
    ]
  }
];
