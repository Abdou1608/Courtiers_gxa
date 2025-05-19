import { Routes } from '@angular/router';
import { CourtiersLayoutComponent } from './courtiers-layout.component';

export const courtiersRoutes: Routes = [
    {
      path: '',
      component: CourtiersLayoutComponent,
      children: [
        { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      //  { path: 'dashboard', loadComponent: () => import('./dashboard.component').then(m => m.DashboardComponent) },
      //  { path: 'produits', loadComponent: () => import('./produits.component').then(m => m.ProduitsComponent) },
      //  { path: 'commissions', loadComponent: () => import('./commissions.component').then(m => m.CommissionsComponent) },
      //  { path: 'profile', loadComponent: () => import('./profile.component').then(m => m.ProfileComponent) }
      ]
    },
    {
      path: 'tiers',
      loadChildren: () => import('./tier/tier.routes').then(m => m.tierRoutes)
    },
  ];
  