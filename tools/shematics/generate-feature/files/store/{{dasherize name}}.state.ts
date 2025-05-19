import { <%= classify(name) %> } from '../<%= dasherize(name) %>.model';

export interface <%= classify(name) %>State {
  data: <%= classify(name) %>[];
  loading: boolean;
  error: any;
}

export const initialState: <%= classify(name) %>State = {
  data: [],
  loading: false,
  error: null
};
