// File: schematics/feature/files/__name@dasherize__/store/__name@dasherize__.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { tierActions } from './tier.actions';
import { Tier } from '../../../core/Model/tier.model';


export interface TierState {
  items: Tier[];
  selected: Tier | null;
  loading: boolean;
  error: string | null;
}

export const initialState: TierState = {
  items: [],
  selected: null,
  loading: false,
  error: null,
};

export const TierReducer = createReducer(
  initialState,
  on(tierActions.load, state => ({ ...state, loading: true })),
  on(tierActions.loadSuccess, (state, { items }) => ({ ...state, items: items, loading: false })),
  on(tierActions.loadFailure, (state, { error }) => ({ ...state, error, loading: false })),

  on(tierActions.get, state => ({ ...state, loading: true })),
  on(tierActions.getSuccess, (state, { item }) => ({ ...state, selected: item, loading: false })),
  on(tierActions.getFailure, (state, { error }) => ({ ...state, error, loading: false })),
 
  on(tierActions.shearch, state => ({ ...state, loading: true })),
  on(tierActions.shearchSuccess, (state, { current_search_items }) => ({ ...state, items: [...state.items, ...current_search_items], current_search_items })),
  on(tierActions.shearchFailure, (state, { error }) => ({ ...state, error, loading: false })),

  on(tierActions.create, state => ({ ...state, loading: true })),
  on(tierActions.createSuccess, (state, { item }) => ({ ...state, items: [...state.items, item], loading: false })),
  on(tierActions.createFailure, (state, { error }) => ({ ...state, error, loading: false })),

  on(tierActions.update, state => ({ ...state, loading: true })),
  on(tierActions.updateSuccess, (state, { item }) => ({
    ...state,
    items: state.items.map(i => i.numtiers === item.numtiers ? item : i),
    loading: false
  })),
  on(tierActions.updateFailure, (state, { error }) => ({ ...state, error, loading: false })),

  on(tierActions.delete, state => ({ ...state, loading: true })),
  on(tierActions.deleteSuccess, (state, { numtiers }) => ({
    ...state,
    items: state.items.filter(i => i.numtiers !== numtiers),
    loading: false
  })),
  on(tierActions.deleteFailure, (state, { error }) => ({ ...state, error, loading: false }))
);


