import { ActionReducerMap, combineReducers } from "@ngrx/store";
import { TierReducer } from '../../../features/tier/store/tier.reducer';
import { FeaturesState} from './features.state';

export const featuresReducer= combineReducers<FeaturesState>({
  tiers:TierReducer,
});