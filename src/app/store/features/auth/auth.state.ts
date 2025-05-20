import { BasSecurityContext } from "../../../Model/BasSoapObject/BasSecurityContext";
import { User } from "../../../Model/user.model";

export interface AuthState {
    user: User ;
    BasSec:BasSecurityContext | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: any ;
  }
  export const initialAuthState: AuthState = {
    user: {
      login: ""
    },
    BasSec:null,
    isAuthenticated: false,
    loading: false,
    error:null
  };