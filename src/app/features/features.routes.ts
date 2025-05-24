import { Routes } from '@angular/router';

import { provideState, provideStore } from '@ngrx/store';

import { provideEffects } from '@ngrx/effects';

import { DashboardComponent } from '../dashboard/dashboard.component';
import { featuresReducer } from '../core/store/features/features.reducer';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AuthEffects } from '../core/store/auth/auth.effects';
import { authReducer } from '../core/store/auth/auth.reducer';
import { TierReducer } from './tier/store/tier.reducer';
import { TierEffects } from './tier/store/tier.effects';
import { FeaturesLayoutComponent } from './features-layout.component';

export const featuresRoutes: Routes = [
    {
      path: '',
     component: FeaturesLayoutComponent,
          providers:[
          provideState('features',featuresReducer),
          provideEffects() ],
      children: [
        { path: 'dashboard',
           loadComponent: () => import('../dashboard/dashboard.component').then(m => m.DashboardComponent) },
       {
            path: 'tiers',
            loadChildren: () => import('./tier/tier.routes').then(m => m.tierRoutes),
            providers:[provideAnimations(),
              provideState("tiers",TierReducer ),
              provideEffects(TierEffects) ],
          },
           
          
      
       // { path: 'dashboard', loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent) },
      //  { path: 'produits', loadComponent: () => import('./produits.component').then(m => m.ProduitsComponent) },
      //  { path: 'commissions', loadComponent: () => import('./commissions.component').then(m => m.CommissionsComponent) },
      //  { path: 'profile', loadComponent: () => import('./profile.component').then(m => m.ProfileComponent) }
      ]
    },
    
  ];
  