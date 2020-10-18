import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { AppInjector } from './app/services/app-injector/app-injector.service';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .then((moduleRef) => {
    debugger;
    AppInjector.setInjector(moduleRef.injector);
    AppInjector.setInjector$(moduleRef.injector);
  })
  .catch(err => console.error(err));
