import { createReducer, on } from '@ngrx/store';
import * as CourtierActions from './courtier.actions';
import { CourtierState, initialCourtierState } from './courtier.state';

export const courtierReducer = createReducer(
  initialCourtierState,
  on(CourtierActions.loadDemandes, (state) => ({ ...state, loading: true, error: null })),
  on(CourtierActions.loadDemandesSuccess, (state, { demandes }) => ({
    ...state,
    demandes,
    loading: false
  })),
  on(CourtierActions.loadDemandesFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  }))
);
