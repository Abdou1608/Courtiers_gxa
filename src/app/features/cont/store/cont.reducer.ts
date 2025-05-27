// File: schematics/feature/files/__name@dasherize__/store/__name@dasherize__.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { contActions } from './cont.actions';
import { Cont } from '../../../core/Model/cont.model';

export interface ContState {
  items: Cont[];
  selected: Cont | null;
  loading: boolean;
  error: string | null;
}

export const initialState: ContState = {
  items: [],
  selected: null,
  loading: false,
  error: null,
};

export const ContReducer = createReducer(
  initialState,
  on(contActions.load, state => ({ ...state, loading: true })),
  on(contActions.loadSuccess, (state, { data }) => ({ ...state, items: data, loading: false })),
  on(contActions.loadFailure, (state, { error }) => ({ ...state, error, loading: false })),

  on(contActions.get, state => ({ ...state, loading: true })),
  on(contActions.getSuccess, (state, { item }) => ({ ...state, selected: item, loading: false })),
  on(contActions.getFailure, (state, { error }) => ({ ...state, error, loading: false })),

  on(contActions.create, state => ({ ...state, loading: true })),
  on(contActions.createSuccess, (state, { item }) => ({ ...state, items: [...state.items, item], loading: false })),
  on(contActions.createFailure, (state, { error }) => ({ ...state, error, loading: false })),

  on(contActions.update, state => ({ ...state, loading: true })),
  on(contActions.updateSuccess, (state, { item }) => ({
    ...state,
    items: state.items.map(i => i.numcont === item.numcont ? item : i),
    loading: false
  })),
  on(contActions.updateFailure, (state, { error }) => ({ ...state, error, loading: false })),

  on(contActions.delete, state => ({ ...state, loading: true })),
  on(contActions.deleteSuccess, (state, { numCont }) => ({
    ...state,
    items: state.items.filter(i => i.numcont !== numCont),
    loading: false
  })),
  on(contActions.deleteFailure, (state, { error }) => ({ ...state, error, loading: false })),
on(contActions.select_current_item, (state, { item }) => ({ ...state, selected:item, }))
);



