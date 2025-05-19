import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { <%= classify(name) %> } from '../<%= dasherize(name) %>.model';

export const <%= camelize(name) %>Actions = createActionGroup({
  source: '[<%= classify(name) %>] Feature',
  events: {
    'Load': emptyProps(),
    'Load Success': props<{ data: <%= classify(name) %>[] }>(),
    'Load Failure': props<{ error: string }>(),
   
    'Get': props<{ id: number }>(),
    'Get Success': props<{ item: <%= classify(name) %> }>(),
    'Get Failure': props<{ error: string }>(),

    'Create': props<{ item: <%= classify(name) %> }>(),
    'Create Success': props<{ item: <%= classify(name) %> }>(),
    'Create Failure': props<{ error: string }>(),

    'Update': props<{ item: <%= classify(name) %> }>(),
    'Update Success': props<{ item: <%= classify(name) %> }>(),
    'Update Failure': props<{ error: string }>(),

    'Delete': props<{ id: number }>(),
    'Delete Success': props<{ id: number }>(),
    'Delete Failure': props<{ error: string }>(),
  }
});