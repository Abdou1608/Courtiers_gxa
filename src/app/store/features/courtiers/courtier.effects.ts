import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as CourtierActions from './courtier.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { CourtierService } from '../../../Services/courtier/courtier.service';

@Injectable()
export class CourtierEffects {
  constructor(private actions$: Actions, private courtierService: CourtierService) {}

  loadDemandes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourtierActions.loadDemandes),
      mergeMap(() =>
        this.courtierService.getDemandes().pipe(
          map(demandes => CourtierActions.loadDemandesSuccess({ demandes })),
          catchError(error => of(CourtierActions.loadDemandesFailure({ error })))
        )
      )
    )
  );
}
