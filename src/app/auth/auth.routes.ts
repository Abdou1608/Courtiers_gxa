import { provideRouter, Routes } from '@angular/router';
import {provideState} from '@ngrx/store';
import {provideEffects} from '@ngrx/effects';
import { LoginComponent } from './login.component';

import { provideAnimations } from '@angular/platform-browser/animations';
import { AuthEffects } from '../core/store/auth/auth.effects';
import { authReducer } from '../core/store/auth/auth.reducer';
import { AuthLayoutComponent } from './AuthLayout.component';



export const authRoutes: Routes = [
  {
    path: '',
    component:AuthLayoutComponent,
    children: [
      {
        path: 'login',
        loadComponent: () => import('./login.component').then(m => m.LoginComponent),
        providers: [
          provideState('auth', authReducer),
          provideEffects(AuthEffects),provideAnimations()
        ],
      }
      // Ajoute register, forgot-password, etc.
    ] }
];
