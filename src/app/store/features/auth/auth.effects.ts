import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as AuthActions from './auth.actions';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { BasSecurityContext } from '../../../Model/BasSoapObject/BasSecurityContext';
import { AuthService } from '../../../Services/auth/auth.service';
import { User } from '../../../Model/user.model';



@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions); // ✅ Injection correcte
  private authService = inject(AuthService);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap(({ username, password, domain }) =>
        this.authService.login(username, password, domain).pipe(
          map((user:BasSecurityContext) =>
            { 
              console.log("FROM EFFECT After .... this.authService.login ")
              return AuthActions.loginSuccess({ user })
        }),
          catchError(error => of(AuthActions.loginFailure({ error })))
        )
      )
    )
  );
  getProf$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.GetProf),
      switchMap(({ username,  domain }) =>
        this.authService.getUserProfile(username,  domain).pipe(
          map((user:User) =>
            { 
              console.log("FROM EFFECT After .... this.authService.login ")
              return AuthActions.GetProfSuccess({ user })
        }),
          catchError(error => of(AuthActions.GetProfFailure({ error })))
        )
      )
    )
    )

}