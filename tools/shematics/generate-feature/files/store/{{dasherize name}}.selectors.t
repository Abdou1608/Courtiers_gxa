import { createFeatureSelector, createSelector } from '@ngrx/store';
import { <%= classify(name) %>State } from './<%= dasherize(name) %>.state';

export const select<%= classify(name) %>Feature = createFeatureSelector<<%= classify(name) %>State>('<%= camelize(name) %>');

export const selectAll<%= classify(name) %>s = createSelector(
  select<%= classify(name) %>Feature,
  state => state.items
);

export const select<%= classify(name) %>Loading = createSelector(
  select<%= classify(name) %>Feature,
  state => state.loading
);

export const select<%= classify(name) %>Error = createSelector(
  select<%= classify(name) %>Feature,
  state => state.error
);

export const selectCurrent<%= classify(name) %> = createSelector(
  select<%= classify(name) %>Feature,
  state => state.selected
);
