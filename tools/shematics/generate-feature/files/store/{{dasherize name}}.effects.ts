import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { <%= classify(name) %>Service } from '../../services/<%= dasherize(name) %>.service';
import { <%= camelize(name) %>Actions } from './<%= dasherize(name) %>.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

export const <%= camelize(name) %>Effects = {
  load: createEffect(() => {
    const actions$ = inject(Actions);
    const service = inject(<%= classify(name) %>Service);
    return actions$.pipe(
      ofType(<%= camelize(name) %>Actions.load),
      mergeMap(() => service.getAll().pipe(
        map(data => <%= camelize(name) %>Actions.loadSuccess({ data })),
        catchError(error => of(<%= camelize(name) %>Actions.loadFailure({ error: error.message })))
      ))
    );
  }),

  get: createEffect(() => {
    const actions$ = inject(Actions);
    const service = inject(<%= classify(name) %>Service);
    return actions$.pipe(
      ofType(<%= camelize(name) %>Actions.get),
      mergeMap(({ id }) => service.getById(id).pipe(
        map(item => <%= camelize(name) %>Actions.getSuccess({ item })),
        catchError(error => of(<%= camelize(name) %>Actions.getFailure({ error: error.message })))
      ))
    );
  }),

  create: createEffect(() => {
    const actions$ = inject(Actions);
    const service = inject(<%= classify(name) %>Service);
    return actions$.pipe(
      ofType(<%= camelize(name) %>Actions.create),
      mergeMap(({ item }) => service.create(item).pipe(
        map(item => <%= camelize(name) %>Actions.createSuccess({ item })),
        catchError(error => of(<%= camelize(name) %>Actions.createFailure({ error: error.message })))
      ))
    );
  }),

  update: createEffect(() => {
    const actions$ = inject(Actions);
    const service = inject(<%= classify(name) %>Service);
    return actions$.pipe(
      ofType(<%= camelize(name) %>Actions.update),
      mergeMap(({ item }) => service.update(item).pipe(
        map(item => <%= camelize(name) %>Actions.updateSuccess({ item })),
        catchError(error => of(<%= camelize(name) %>Actions.updateFailure({ error: error.message })))
      ))
    );
  }),

  delete: createEffect(() => {
    const actions$ = inject(Actions);
    const service = inject(<%= classify(name) %>Service);
    return actions$.pipe(
      ofType(<%= camelize(name) %>Actions.delete),
      mergeMap(({ id }) => service.delete(id).pipe(
        map(() => <%= camelize(name) %>Actions.deleteSuccess({ id })),
        catchError(error => of(<%= camelize(name) %>Actions.deleteFailure({ error: error.message })))
      ))
    );
  })
};