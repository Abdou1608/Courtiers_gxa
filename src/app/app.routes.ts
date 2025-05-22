import { provideRouter, Routes, withDebugTracing, withRouterConfig } from '@angular/router';
import { authRoutes } from './auth/auth.routes';

export const appRoutes: Routes = [

    { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    { path: 'welcome', 
    loadComponent: () => import('./welcome/welcome.component').then(m => m.WelcomeComponent)
  },
  {
    path: 'login',  pathMatch: 'full',
    
    loadChildren: () => import('./auth/auth.routes').then(m => m.authRoutes),
   
  },
    {
      path: 'courtiers', 
      loadChildren: () => import('./courtiers/courtiers.routes').then(m => m.courtiersRoutes)
    },
   
   
  ];