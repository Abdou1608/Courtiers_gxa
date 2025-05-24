
import { AuthState } from "./auth/auth.state";
import {  FeaturesState } from "./features/features.state";

export interface AppState {
  auth: AuthState;
  features: FeaturesState;

}