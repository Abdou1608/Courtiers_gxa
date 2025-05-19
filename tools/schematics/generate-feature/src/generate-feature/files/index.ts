import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
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

import { <%= classify(name) %>BaseComponent } from './base/<%= dasherize(name) %>-base.component';
import { <%= classify(name) %>ListComponent } from './list/<%= dasherize(name) %>-list.component';
import { <%= classify(name) %>DetailComponent } from './detail/<%= dasherize(name) %>-detail.component';
import { <%= classify(name) %>Reducer } from './store/<%= dasherize(name) %>.reducer';
import { <%= classify(name) %>Effects } from './store/<%= dasherize(name) %>.effects';

@Component({
  selector: 'app-<%= dasherize(name) %>',
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
    <%= classify(name) %>BaseComponent,
    <%= classify(name) %>ListComponent,
    <%= classify(name) %>DetailComponent
  ],
  providers: [
    provideHttpClient(),
    provideState({ name: '<%= camelize(name) %>', reducer: <%= classify(name) %>Reducer }),
    provideEffects({ effects: [<%= classify(name) %>Effects] })
  ],
  template: `<app-<%= dasherize(name) %>-base />`
})
export class <%= classify(name) %>Component {}
