import { ActionReducerMap } from "@ngrx/store";
import { AppState } from "./app.state";
import { authReducer } from "./features/auth/auth.reducer";
import { courtierReducer } from "./features/courtiers/courtier.reducer";
import { TierReducer } from "../courtiers/tier/store/tier.reducer";

export const appReducers: ActionReducerMap<AppState> = {
    auth: authReducer,
    courtier: courtierReducer,
    tier:TierReducer,
  
  };