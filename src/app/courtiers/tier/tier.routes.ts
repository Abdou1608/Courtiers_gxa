import { Routes } from '@angular/router';
import { TierComponent } from './index';
import { TierListComponent } from './list/tier-list.component';
import { TierBaseComponent } from './base/tier-base.component';
import { TierReducer } from './store/tier.reducer';
import { TierEffects } from './store/tier.effects';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideAnimations } from '@angular/platform-browser/animations';
import { TierDetailComponent } from './detail/tier-detail.component';

export const tierRoutes: Routes = [
       {
         path: '',
         providers: [
          provideState('tier', TierReducer),
          provideEffects(TierEffects),
          provideAnimations(),
          
        ],
         component: TierBaseComponent,
         children: [
           { path: '', component: TierListComponent },
           { path: ':id', component: TierDetailComponent },
         ],
       },
     ];
    