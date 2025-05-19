import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { AuthState, initialAuthState } from './auth.state';

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.login, (state) => ({ ...state, loading: true, error: null,isAuthenticated:false })),
  on(AuthActions.loginSuccess, (state, { user }) => ({
    ...state,
    BasSec:user,
    isAuthenticated: true
  })),
  on(AuthActions.GetProf, (state) => ({ ...state, loading: true, error: null})),
  on(AuthActions.GetProfSuccess, (state, { user }) => ({
    ...state,
    user:user,
    loading: false,
    error:null
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
    isAuthenticated: false
  })),
  on(AuthActions.GetProfFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
    isAuthenticated: false
  }))
);