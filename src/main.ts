import 'zone.js'; // obligatoire pour NG bootstrap
import { bootstrapApplication} from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { provideAppStore } from './app/store/app-store.module';


bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...appConfig.providers,
    ...provideAppStore,
    provideAnimations()
  ]
})
  .catch((err) => console.error('❌ Bootstrap error (client):', err));