import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { defineCustomElements } from '@pol/ui-core/loader';
defineCustomElements();

bootstrapApplication(App, appConfig).catch((err) => console.error(err));
