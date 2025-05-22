import { BasSecurityContext } from "../../../Model/BasSoapObject/BasSecurityContext";
import { User } from "../../../Model/user.model";
import { Xtlog } from "../../../Model/xtlog.model";

export interface AuthState {
    user: Xtlog ;
    BasSec:BasSecurityContext | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: any ;
  }
  export const initialAuthState: AuthState = {
    user: {
      numtiers: 0,
      ordreext: 0
    },
    BasSec:null,
    isAuthenticated: false,
    loading: false,
    error:null
  };