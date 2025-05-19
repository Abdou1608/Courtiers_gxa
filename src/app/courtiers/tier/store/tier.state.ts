import { Tier } from "../../../Model/tier.model";


export interface TierState {
  items: Tier[];
  selected: Tier | null;
  loading: boolean;
  error: any;
}

export const initialState: TierState = {
  items: [],
  loading: false,
  error: null,
  selected: null
};
