import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';

import {KeycloakService} from './app/service/keycloakService';

if (environment.production) {
  enableProdMode();
}

KeycloakService.init()
  .then(() => {
    const platform = platformBrowserDynamic();
    platform.bootstrapModule(AppModule);
  })
  .catch(() => window.location.reload());


