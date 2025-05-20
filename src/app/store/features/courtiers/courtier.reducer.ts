import { createReducer, on } from '@ngrx/store';
import * as CourtierActions from './courtier.actions';
import { CourtierState, initialCourtierState } from './courtier.state';

export const courtierReducer = createReducer(
  initialCourtierState,
  on(CourtierActions.loadDossiers, (state) => ({ ...state, loading: true, error: null })),
  on(CourtierActions.loadDossiersSuccess, (state, { Dossiers }) => ({
    ...state,
    Dossiers,
    loading: false
  })),
  on(CourtierActions.loadDossiersFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  }))
);
