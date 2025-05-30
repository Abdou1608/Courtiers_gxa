import { Tier } from "../../../core/Model/tier.model";



export interface TierState {
  items: Tier[];
  current_shearch_items: Tier[];
  selected: Tier | null;
  loading: boolean;
  error: any;
}

export const initialState: TierState = {
  items: [],
  current_shearch_items: [],
  loading: false,
  error: null,
  selected: null
};
