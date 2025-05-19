import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { tierActions } from './tier.actions';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';
import { TierService } from '../service/tier.service';


@Injectable()
export class TierEffects {
  private actions$ = inject(Actions); // ✅ Injection correcte
  private service = inject(TierService);

  load= createEffect(() => {

    return this.actions$.pipe(
      ofType(tierActions.load),
      mergeMap(() => this.service.getAll().pipe(
        map(items => tierActions.loadSuccess({ items })),
        catchError(error => of(tierActions.loadFailure({ error: error.message })))
      ))
    )
  })

  get= createEffect(() => {

    return this.actions$.pipe(
      ofType(tierActions.get),
      mergeMap(({ id }) => this.service.getByID(id).pipe(
        map(item => tierActions.getSuccess({ item })),
        catchError(error => of(tierActions.getFailure({ error: error.message })))
      ))
    )
  })

  create= createEffect(() => {
    return this.actions$.pipe(
      ofType(tierActions.create),
      mergeMap(({ item }) => this.service.create(item).pipe(
        map(item => tierActions.createSuccess({ item })),
        catchError(error => of(tierActions.createFailure({ error: error.message })))
      ))
    )
  })

  update= createEffect(() => {
    return this.actions$.pipe(
      ofType(tierActions.update),
      mergeMap(({ item }) => this.service.update(item, item.numtiers).pipe(
        map(item => tierActions.updateSuccess({ item })),
        catchError(error => of(tierActions.updateFailure({ error: error.message })))
      ))
    )
  })

  delete= createEffect(() => {
    return this.actions$.pipe(
      ofType(tierActions.delete),
      mergeMap(({ id }) => this.service.delete(id).pipe(
        map(() => tierActions.deleteSuccess({ id })),
        catchError(error => of(tierActions.deleteFailure({ error: error.message })))
      ))
    )
  })
}