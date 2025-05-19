import 'zone.js/node';
import { renderApplication } from '@angular/platform-server';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';

export async function handleRequest(url: string, document: string): Promise<string> {
  return renderApplication(() => bootstrapApplication(AppComponent, config), {
    document,
    url,
  });
}