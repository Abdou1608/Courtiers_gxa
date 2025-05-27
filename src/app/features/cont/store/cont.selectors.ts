import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ContState } from './cont.state';

export const selectContFeature = createFeatureSelector<ContState>('cont');

export const selectAllConts = createSelector(
  selectContFeature,
  state => state.data
);

export const selectContLoading = createSelector(
  selectContFeature,
  state => state.loading
);

export const selectContError = createSelector(
  selectContFeature,
  state => state.error
);

export const selectCurrentCont = createSelector(
  selectContFeature,
  state => state.selected
);
