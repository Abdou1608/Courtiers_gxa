import 'zone.js/node';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from '../src/app/app.component';
import { appConfig } from '../src/app/app.config';
import { provideAppStore } from '../src/app/store/app-store.module';


bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...appConfig.providers,
    ...provideAppStore
  ]
})
  .catch((err) => console.error('❌ Bootstrap error (client):', err));