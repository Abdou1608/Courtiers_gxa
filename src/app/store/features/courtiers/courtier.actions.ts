import { createAction, props } from '@ngrx/store';

export const loadDossiers = createAction('[Courtier] Load Dossiers');
export const loadDossiersSuccess = createAction('[Courtier] Load Dossiers Success', props<{ Dossiers: any[] }>());
export const loadDossiersFailure = createAction('[Courtier] Load Dossiers Failure', props<{ error: any }>());
