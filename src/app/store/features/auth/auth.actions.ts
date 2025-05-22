import { createAction, props } from '@ngrx/store';
import { BasSecurityContext } from '../../../Model/BasSoapObject/BasSecurityContext';
import { User } from '../../../Model/user.model';
import { Xtlog } from '../../../Model/xtlog.model';
export const loginStart = createAction('[Auth] loginStart');
export const login = createAction('[Auth] Login', props<{ username: string; password: string ; domain:string}>());
export const loginSuccess = createAction('[Auth] Login Success', props<{ user: BasSecurityContext, username: string; domain:string}>());
export const loginFailure = createAction('[Auth] Login Failure', props<{  error: any }>());
export const GetProf = createAction(
    '[Auth] Get-prof',
    props<{ username: string; domain:string }>()
  
  );
  export const UpdateProf = createAction(
    '[Auth] Update Profile ',
    props<{ user: Xtlog | Partial<Xtlog>}>()
  
  );
  export const UpdateProfSucces = createAction(
    '[Auth] Update Profile Success',
    props<{ user: Xtlog}>()
  
  );
  
  
  export const GetProfSuccess = createAction(
    '[Auth] Get-prof Success',
    props<{ user: Xtlog }>()
  );
  
  export const GetProfFailure = createAction(
    '[Auth] Get-prof Failure',
    props<{ error: any }>()
  );

  export const UpdateProfFailure = createAction(
    '[Auth] UpdateProfFailure',
    props<{ error: any }>()
  
  );

export const logout= createAction(
  '[Auth] Logout'
);
  