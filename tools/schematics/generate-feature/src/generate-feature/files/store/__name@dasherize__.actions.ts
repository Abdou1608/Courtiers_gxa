import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { <%= classify(name) %> } from '../../../core/Model/<%= dasherize(name) %>.model';

export const <%= camelize(name) %>Actions = createActionGroup({
  source: '[<%= classify(name) %>] Feature',
  events: {
    'Load': emptyProps(),
    'Load Success': props<{ data: <%= classify(name) %>[] }>(),
    'Load Failure': props<{ error: string }>(),
   
    'Get': props<{ num<%= classify(name) %>: number }>(),
    'Get Success': props<{ item: <%= classify(name) %> }>(),
    'Get Failure': props<{ error: string }>(),

    'Create': props<{ item: <%= classify(name) %> }>(),
    'Create Success': props<{ item: <%= classify(name) %> }>(),
    'Create Failure': props<{ error: string }>(),

    'Update': props<{ item: <%= classify(name) %>, num<%= classify(name) %>:any }>(),
    'Update Success': props<{ item: <%= classify(name) %> }>(),
    'Update Failure': props<{ error: string }>(),

    'Delete': props<{ num<%= classify(name) %>: any }>(),
    'Delete Success': props<{ num<%= classify(name) %>: any }>(),
    'Delete Failure': props<{ error: string }>(),
  }
  'Select_current_item': props<{ item: <%= classify(name) %> }>(),
  
});