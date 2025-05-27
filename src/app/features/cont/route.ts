import { Routes } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { ContListComponent } from './list/cont-list.component';
import { ContBaseComponent } from './base/cont-base.component';

import { ContReducer } from './store/cont.reducer';

import { ContDetailComponent } from './detail/cont-detail.component';
import { ContEffects } from './store/cont.effects';

export const contRoutes: Routes = [
       {
         path: '',
         providers: [
          provideState('cont', ContReducer),
          provideEffects(ContEffects),
          provideAnimations(),
          
        ],
         component: ContBaseComponent,
         children: [
           { path: '', component: ContListComponent },
           { path: ':id', component: ContDetailComponent },
         ],
       },
     ];
    