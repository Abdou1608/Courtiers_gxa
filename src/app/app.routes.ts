import { provideRouter, Routes, withDebugTracing, withRouterConfig } from '@angular/router';
import { authRoutes } from './auth/auth.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { AuthEffects } from './core/store/auth/auth.effects';
import { authReducer } from './core/store/auth/auth.reducer';

export const appRoutes: Routes = [

    { path: '', redirectTo: 'welcome',pathMatch:"full"},
    { path: 'welcome', 
    loadComponent: () => import('./welcome/welcome.component').then(m => m.WelcomeComponent)
  },
  {
    path: '', 
    
   // component:LoginComponent
   loadChildren: () => import('./auth/auth.routes').then(m => m.authRoutes), 
  },
    {
      path: '', 
      loadChildren: () => import('./features/features.routes').then(m => m.featuresRoutes),
    },
   
   
  ];