import { <%= classify(name) %> } from '../../../core/Model/<%= dasherize(name) %>.model';

export interface <%= classify(name) %>State {
  data: <%= classify(name) %>[];
  selected: <%= classify(name) %> | null;
  loading: boolean;
  error: any;
}

export const initialState: <%= classify(name) %>State = {
  data: [],
  selected:null,
  loading: false,
  error: null
};
