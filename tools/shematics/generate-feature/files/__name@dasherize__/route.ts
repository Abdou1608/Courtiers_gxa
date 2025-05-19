import { Routes } from '@angular/router';
import { <%= classify(name) %>Component } from './index';

export const <%= camelize(name) %>Routes: Routes = [
       {
         path: '',
         component: BaseComponent,
         children: [
           { path: '', component: ListComponent },
           { path: ':id', component: DetailComponent },
         ],
       },
     ];
    