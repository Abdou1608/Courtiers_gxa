import { createAction, props } from '@ngrx/store';
import { BasSecurityContext } from '../../../Model/BasSoapObject/BasSecurityContext';
import { User } from '../../../Model/user.model';

export const login = createAction('[Auth] Login', props<{ username: string; password: string ; domain?:string}>());
export const loginSuccess = createAction('[Auth] Login Success', props<{ user: BasSecurityContext }>());
export const loginFailure = createAction('[Auth] Login Failure', props<{  error: string }>());
export const GetProf = createAction(
    '[Auth] Get-prof',
    props<{ username: string; domain:string }>()
  
  );
  
  export const GetProfSuccess = createAction(
    '[Auth] Get-prof Success',
    props<{ user: User }>()
  );
  
  export const GetProfFailure = createAction(
    '[Auth] Get-prof Failure',
    props<{ error: any }>()
  );
  