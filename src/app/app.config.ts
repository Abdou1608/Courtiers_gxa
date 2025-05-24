import { ApplicationConfig, provideZoneChangeDetection, isDevMode, importProvidersFrom } from '@angular/core';
import { provideRouter, withRouterConfig } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { appRoutes } from './app.routes';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { provideAppStore } from './core/store/app-store.module';


export const appConfig: ApplicationConfig = {
  
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    importProvidersFrom(BrowserAnimationsModule),
    
   //provideRouter(appRoutes),
    provideHttpClient(withFetch()),
    provideAppStore,
   
    provideAnimations(),
 provideRouter(appRoutes,
  withRouterConfig({
    onSameUrlNavigation: 'reload',
    resolveNavigationPromiseOnError:true,
    
 })),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
   
    
  ]
  
};

