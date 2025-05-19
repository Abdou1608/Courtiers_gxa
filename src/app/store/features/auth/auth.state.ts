import { BasSecurityContext } from "../../../Model/BasSoapObject/BasSecurityContext";
import { User } from "../../../Model/user.model";

export interface AuthState {
    user: User | null;
    BasSec:BasSecurityContext | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
  }
  export const initialAuthState: AuthState = {
    user: null,
    BasSec:null,
    isAuthenticated: false,
    loading: false,
    error:""
  };