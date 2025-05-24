import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

import { TierBaseComponent } from './base/tier-base.component';

import { TierReducer } from './store/tier.reducer';
import { TierEffects } from './store/tier.effects';
import { TierListComponent } from './list/tier-list.component';
import { TierDetailComponent } from './detail/tier-detail.component';

@Component({
  selector: 'app-tier',
  standalone: true,
  imports: [
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    TierBaseComponent
],
  
  template: `<app-tier-base />`
})
export class TierComponent {}
