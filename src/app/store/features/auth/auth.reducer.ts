import { createReducer, on, props } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { AuthState, initialAuthState } from './auth.state';

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.loginStart, (state) => ({ ...state, loading: true,isAuthenticated:false })),
  on(AuthActions.login, (state ) => ({ ...state, loading: true, isAuthenticated:false })),
  on(AuthActions.loginSuccess, (state, { user }) => ({
    ...state,
    BasSec:user,
    isAuthenticated: true,
    loading:false,
  })),
  on(AuthActions.GetProf, (state) => ({ ...state, loading: false})),
  on(AuthActions.GetProfSuccess, (state, { user }) => ({
    ...state,
    user:user,
    loading: false,
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: typeof error === 'string'
    ? error
    : (error as { message?: string })?.message || 'Erreur de connection, réessayer',
    isAuthenticated: false
  })),
  on(AuthActions.GetProfFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: typeof error === 'string' ? error : error?.message || 'Erreur inconnue de chargement du profil utilisateur, reesayez',
    isAuthenticated: false
  }))
);