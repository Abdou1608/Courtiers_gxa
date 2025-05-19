import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { config } from './app.config.server';

export default function bootstrap() {
  return bootstrapApplication(AppComponent, config);
}



