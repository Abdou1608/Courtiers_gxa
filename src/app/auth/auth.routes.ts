import { provideRouter, Routes } from '@angular/router';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { LoginComponent } from './login.component';

import { provideAnimations } from '@angular/platform-browser/animations';
import { AuthEffects } from '../store/features/auth/auth.effects';
import { authReducer } from '../store/features/auth/auth.reducer';

export const authRoutes: Routes = [
  {
    path: '',
    providers: [
      provideState('auth', authReducer),
      provideEffects(AuthEffects),
      provideAnimations(),
      
    ],
    component: LoginComponent
  }
];
