import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ContService } from '../service/cont.service';
import { contActions } from './cont.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { Cont } from '../../../core/Model/cont.model';

@Injectable()
export class ContEffects {
   actions$ = inject(Actions);
   service = inject(ContService);

  load= createEffect(() => {
 
    return this.actions$.pipe(
      ofType(contActions.load),
      mergeMap(() => this.service.getAll().pipe(
        map(data => contActions.loadSuccess({ data })),
        catchError(error => of(contActions.loadFailure({ error: error.message })))
      ))
    );
  });

  get= createEffect(() => {
    const actions$ = inject(Actions);
    const service = inject(ContService);
    return actions$.pipe(
      ofType(contActions.get),
      mergeMap(({numCont}) => service.getById(numCont).pipe(
        map((item:Cont) => contActions.getSuccess({ item })),
        catchError(error => of(contActions.getFailure({ error: error.message })))
      ))
    );
  });

  create= createEffect(() => {
    const actions$ = inject(Actions);
    const service = inject(ContService);
    return actions$.pipe(
      ofType(contActions.create),
      mergeMap(({ item }) => service.create(item).pipe(
        map(item => contActions.createSuccess({ item })),
        catchError(error => of(contActions.createFailure({ error: error.message })))
      ))
    );
  });

  update= createEffect(() => {
    const actions$ = inject(Actions);
    const service = inject(ContService);
    return actions$.pipe(
      ofType(contActions.update),
      mergeMap(({ item,numCont }) => service.update(item,numCont).pipe(
        map(item => contActions.updateSuccess({ item })),
        catchError(error => of(contActions.updateFailure({ error: error.message })))
      ))
    );
  });

  delete= createEffect(() => {
    const actions$ = inject(Actions);
    const service = inject(ContService);
    return actions$.pipe(
      ofType(contActions.delete),
      mergeMap(({numCont}) => service.delete(numCont).pipe(
        map(() => contActions.deleteSuccess({numCont})),
        catchError(error => of(contActions.deleteFailure({ error: error.message })))
      ))
    );
  })
}