import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { isDevMode } from '@angular/core';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { appReducers } from './app.reducer';

export const provideAppStore = [
  provideStore(appReducers),
  provideEffects([]), // Ajoutez effets globaux si présents
  provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
];
