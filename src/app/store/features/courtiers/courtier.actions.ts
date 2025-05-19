import { createAction, props } from '@ngrx/store';

export const loadDemandes = createAction('[Courtier] Load Demandes');
export const loadDemandesSuccess = createAction('[Courtier] Load Demandes Success', props<{ demandes: any[] }>());
export const loadDemandesFailure = createAction('[Courtier] Load Demandes Failure', props<{ error: any }>());
