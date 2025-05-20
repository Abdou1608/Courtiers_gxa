import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as AuthActions from './auth.actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
//import { of } from 'rxjs';
import { BasSecurityContext } from '../../../Model/BasSoapObject/BasSecurityContext';
import { AuthService } from '../../../Services/auth/auth.service';
import { User } from '../../../Model/user.model';
//import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';



@Injectable()
export class AuthEffects {
  private router = inject(Router);
  private actions$ = inject(Actions); // ✅ Injection correcte
  private authService = inject(AuthService);

  constructor(
   // private router: Router,
    private snackBar: MatSnackBar
  ) {}
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap(({ username, password, domain }) =>
      this.authService.login(username, password, domain).pipe(
          map((user:BasSecurityContext) =>
            { 
              console.log("FROM EFFECT After .... this.authService.login ")
              return AuthActions.loginSuccess({ user, username, domain })
        }),catchError((error:Error) => of(AuthActions.loginFailure({ error:error.message }))
        )
        )
      )
    )
  );

  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginSuccess),
      map(({ user, username,domain }) => AuthActions.GetProf({username:username, domain:domain }))
    )
  );
  

  getProf$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.GetProf),
      switchMap(({ username,  domain }) =>
        this.authService.getUserProfile(username,  domain).pipe(
          map((user:User) =>
            { 
              console.log("FROM EFFECT After .... this.authService.login "+JSON.stringify(user))
              return AuthActions.GetProfSuccess({ user })
        }),
          catchError((error:Error) => of(AuthActions.GetProfFailure({ error:error.message })))
        )
      )
    )
    )
  
    loginFailure$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(AuthActions.loginFailure),
          tap(({ error }) => {
            console.error('Login error:', error);
            this.snackBar.open(this.humanizeError(error), 'Fermer', {
              duration: 5000,
              panelClass: ['mat-toolbar', 'mat-warn'],
            });
          })
        ),
      { dispatch: false }
    );

    GetProfSuccess$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(AuthActions.GetProfSuccess),
          tap(() => this.router.navigate(['courtiers']))
        ),
      { dispatch: false }
    )
  
    GetProfFailure$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(AuthActions.GetProfFailure),
          tap(({ error }) => {
            console.error('Erreur de Chargement du profil utilisateur:', error);
            this.snackBar.open(this.humanizeError(error), 'Fermer', {
              duration: 5000,
              panelClass: ['mat-toolbar', 'mat-warn'],
            });
          })
        ),
      { dispatch: false }
    );

    logout$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(AuthActions.logout),
          tap(() => {
            this.router.navigate(['/login']);
            this.snackBar.open('Déconnexion réussie.', 'Fermer', {
              duration: 3000,
              panelClass: ['mat-toolbar', 'mat-accent'],
            });
          })
        ),
      { dispatch: false }
    );
    
  
    private formatError(error: any): string {
      if (typeof error === 'string') return error;
      if (error?.error?.faultstring) return error.error.faultstring;
      if (error?.message) return error.message;
      return 'Erreur inconnue lors de l\'authentification.';
    }
  
    private humanizeError(error: string): string {
      return error;
    }


  };