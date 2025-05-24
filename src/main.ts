import 'zone.js'; // obligatoire pour NG bootstrap
import { bootstrapApplication} from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';



bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...appConfig.providers,
  ]
})
  .catch((err) => console.error('❌ Bootstrap error (client):', err));