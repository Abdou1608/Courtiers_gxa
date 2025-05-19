// File: schematics/feature/files/__name@dasherize__/store/__name@dasherize__.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { <%= camelize(name) %>Actions } from './<%= dasherize(name) %>.actions';
import { <%= classify(name) %> } from '../../models/<%= dasherize(name) %>.model';

export interface <%= classify(name) %>State {
  items: <%= classify(name) %>[];
  selected: <%= classify(name) %> | null;
  loading: boolean;
  error: string | null;
}

export const initialState: <%= classify(name) %>State = {
  items: [],
  selected: null,
  loading: false,
  error: null,
};

export const <%= classify(name) %>Reducer = createReducer(
  initialState,
  on(<%= camelize(name) %>Actions.load, state => ({ ...state, loading: true })),
  on(<%= camelize(name) %>Actions.loadSuccess, (state, { data }) => ({ ...state, items: data, loading: false })),
  on(<%= camelize(name) %>Actions.loadFailure, (state, { error }) => ({ ...state, error, loading: false })),

  on(<%= camelize(name) %>Actions.get, state => ({ ...state, loading: true })),
  on(<%= camelize(name) %>Actions.getSuccess, (state, { item }) => ({ ...state, selected: item, loading: false })),
  on(<%= camelize(name) %>Actions.getFailure, (state, { error }) => ({ ...state, error, loading: false })),

  on(<%= camelize(name) %>Actions.create, state => ({ ...state, loading: true })),
  on(<%= camelize(name) %>Actions.createSuccess, (state, { item }) => ({ ...state, items: [...state.items, item], loading: false })),
  on(<%= camelize(name) %>Actions.createFailure, (state, { error }) => ({ ...state, error, loading: false })),

  on(<%= camelize(name) %>Actions.update, state => ({ ...state, loading: true })),
  on(<%= camelize(name) %>Actions.updateSuccess, (state, { item }) => ({
    ...state,
    items: state.items.map(i => i.id === item.id ? item : i),
    loading: false
  })),
  on(<%= camelize(name) %>Actions.updateFailure, (state, { error }) => ({ ...state, error, loading: false })),

  on(<%= camelize(name) %>Actions.delete, state => ({ ...state, loading: true })),
  on(<%= camelize(name) %>Actions.deleteSuccess, (state, { id }) => ({
    ...state,
    items: state.items.filter(i => i.id !== id),
    loading: false
  })),
  on(<%= camelize(name) %>Actions.deleteFailure, (state, { error }) => ({ ...state, error, loading: false }))
);


