import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TierState } from './tier.state';

export const selectTierFeature = createFeatureSelector<TierState>('tier');

export const selectAllTiers = createSelector(
  selectTierFeature,
  state => state.items
);

export const selectTierLoading = createSelector(
  selectTierFeature,
  state => state.loading
);

export const selectTierError = createSelector(
  selectTierFeature,
  state => state.error
);

export const selectCurrentTier = createSelector(
  selectTierFeature,
  state => state.selected
);
