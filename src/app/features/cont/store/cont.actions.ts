import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Cont } from '../../../core/Model/cont.model';

export const contActions = createActionGroup({
  source: '[Cont] Feature',
  events: {
    'Load': emptyProps(),
    'Load Success': props<{ data: Cont[] }>(),
    'Load Failure': props<{ error: string }>(),
   
    'Get': props<{ numCont: number }>(),
    'Get Success': props<{ item: Cont }>(),
    'Get Failure': props<{ error: string }>(),

    'Create': props<{ item: Cont }>(),
    'Create Success': props<{ item: Cont }>(),
    'Create Failure': props<{ error: string }>(),

    'Update': props<{ item: Cont, numCont:any }>(),
    'Update Success': props<{ item: Cont }>(),
    'Update Failure': props<{ error: string }>(),

    'Delete': props<{ numCont: any }>(),
    'Delete Success': props<{ numCont: any }>(),
    'Delete Failure': props<{ error: string }>(),
    'Select_current_item': props<{ item: Cont }>()
  }
  
  
});