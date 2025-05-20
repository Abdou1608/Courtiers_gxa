// File: store/features/auth/auth.selectors.ts

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../../app.state';
import { AuthState } from './auth.state';

export const selectAuthState = createFeatureSelector<AuthState>('auth')
export const selectAuthLoading = createSelector(
  selectAuthState,
  (state: AuthState) => state.loading
);

export const selectAuthError = createSelector(
  selectAuthState,
  (state: AuthState) => state.error
);

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state: AuthState) => state.isAuthenticated
);
export const selectUserProfile = createSelector(
    selectAuthState,
    (state: AuthState) => state.user
  );
  