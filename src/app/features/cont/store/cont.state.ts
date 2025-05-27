import { Cont } from '../../../core/Model/cont.model';

export interface ContState {
  data: Cont[];
  selected: Cont | null ;
  loading: boolean;
  error: any;
}

export const initialState: ContState = {
  data: [],
  selected:null,
  loading: false,
  error: null
};
