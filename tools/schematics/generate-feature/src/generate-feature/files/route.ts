import { Routes } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { <%= classify(name) %>Component } from './index';
import { <%= classify(name) %>ListComponent } from './list/<%= dasherize(name) %>-list.component';
import { <%= classify(name) %>BaseComponent } from './base/<%= dasherize(name) %>-base.component';
import { <%= classify(name) %>DetailComponent } from `./detail/<%= dasherize(name) %>-detail.component`;
import { <%= classify(name) %>Reducer } from './store/<%= dasherize(name) %>.reducer';
import { <%= classify(name) %>Effects } from './store/<%= dasherize(name) %>.effects';

export const <%= camelize(name) %>Routes: Routes = [
       {
         path: '',
         providers: [
          provideState('<%= dasherize(name) %>', <%= classify(name) %>Reducer),
          provideEffects(<%= classify(name) %>Effects),
          provideAnimations(),
          
        ],
         component: <%= classify(name) %>BaseComponent,
         children: [
           { path: '', component: <%= classify(name) %>ListComponent },
           { path: ':id', component: <%= classify(name) %>DetailComponent },
         ],
       },
     ];
    