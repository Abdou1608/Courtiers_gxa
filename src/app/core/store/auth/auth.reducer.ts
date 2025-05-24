import { createReducer, on, props } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { initialAuthState } from './auth.state';

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.loginStart, (state) => ({ ...state, loading: true,isAuthenticated:false })),
  on(AuthActions.login, (state ) => ({ ...state, loading: true, isAuthenticated:false })),
  on(AuthActions.loginSuccess, (state, { user }) => ({
    ...state,
    BasSec:user,
    loading:true,
  })),
  on(AuthActions.GetProf, (state) => ({ ...state, loading: true})),
  on(AuthActions.GetProfSuccess, (state, { user }) => ({
    ...state,
    user:user,
    loading: false,
    isAuthenticated: true,
  })),
  on(AuthActions.UpdateProf, (state) => ({ ...state, loading: true})),
  on(AuthActions.UpdateProfSucces, (state, { user }) => ({ ...state,user , loading: false})),

 
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
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
  })),
  on(AuthActions.UpdateProfFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: typeof error === 'string' ? error : error?.message || 'Erreur inconnue de chargement du profil utilisateur, reesayez'
  })),
  on(AuthActions.logout, (state) => ({ ...state, loading: false, BasSec:null, user:{
    Numtiers: 0,
    Ordreext: 0
  }, isAuthenticated:false})),
);