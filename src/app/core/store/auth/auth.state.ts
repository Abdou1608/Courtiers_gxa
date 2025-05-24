import { BasSecurityContext } from "../../Model/BasSoapObject/BasSecurityContext";
import { Xtlog } from "../../Model/xtlog.model";

export interface AuthState {
    user: Xtlog ;
    BasSec:BasSecurityContext | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: any ;
  }
  export const initialAuthState: AuthState = {
    user: {
      Numtiers: 0,
      Ordreext: 0
    },
    BasSec:null,
    isAuthenticated: false,
    loading: false,
    error:null
  };