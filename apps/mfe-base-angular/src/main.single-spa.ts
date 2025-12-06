import 'zone.js';
import '@pol/design-tokens/dist/tokens.css';
import { enableProdMode, NgZone } from '@angular/core';
import singleSpaAngular from 'single-spa-angular';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

const lifecycles = singleSpaAngular({
  bootstrapFunction: () => platformBrowserDynamic().bootstrapModule(AppModule),
  template: '<pol-root />',
  Router: null as any,
  NgZone,
});

export const { bootstrap, mount, unmount } = lifecycles;
