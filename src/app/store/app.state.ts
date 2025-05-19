import { TierState } from "../courtiers/tier/store/tier.state";
import { AuthState } from "./features/auth/auth.state";
import { CourtierState } from "./features/courtiers/courtier.state";

export interface AppState {
  auth: AuthState;
  courtier: CourtierState;
  tier:TierState
}