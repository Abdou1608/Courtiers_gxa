import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { <%= classify(name) %>Service } from '../service/<%= dasherize(name) %>.service';
import { <%= camelize(name) %>Actions } from './<%= dasherize(name) %>.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { <%= classify(name) %> } from '../../../core/Model/<%= dasherize(name) %>.model';

export const <%= classify(name) %>Effects = {
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
      mergeMap(({<%= classify(name) %>}) => service.getByID(<%= classify(name) %>).pipe(
        map((item:<%= camelize(name) %>) => <%= camelize(name) %>Actions.getSuccess({ item })),
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
      mergeMap(({ item,<%= classify(name) %> }) => service.update(item,<%= classify(name) %>).pipe(
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
      mergeMap(({<%= classify(name) %>}) => service.delete(<%= classify(name) %>).pipe(
        map(() => <%= camelize(name) %>Actions.deleteSuccess({<%= classify(name) %>})),
        catchError(error => of(<%= camelize(name) %>Actions.deleteFailure({ error: error.message })))
      ))
    );
  })
};