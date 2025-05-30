import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Tier } from '../../../core/Model/tier.model';



export const tierActions = createActionGroup({
  source: '[Tier] Feature',
  events: {
    'Load': emptyProps(),
    'Load Success': props<{ items: Tier[] }>(),
    'Load Failure': props<{ error: string }>(),
   
    'Get': props<{ numtiers: number }>(),
    'Get Success': props<{ item: Tier }>(),
    'Get Failure': props<{ error: string }>(),
    'Shearch': props<{ reference: any, dppname:string }>(),
    'Shearch Success': props<{current_search_items: Tier[]  }>(),
    'Shearch Failure': props<{ error: string }>(),

    'Create': props<{ item: Tier }>(),
    'Create Success': props<{ item: Tier }>(),
    'Create Failure': props<{ error: string }>(),

    'Update': props<{ item: Tier }>(),
    'Update Success': props<{ item: Tier }>(),
    'Update Failure': props<{ error: string }>(),

    'Delete': props<{ numtiers: number }>(),
    'Delete Success': props<{ numtiers: number }>(),
    'Delete Failure': props<{ error: string }>(),
  }
});