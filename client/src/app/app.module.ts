import { BrowserModule } from '@angular/platform-browser';
import { Injector, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedComponentsModule } from './shared/components/shared-components.module';
import { PagesModule } from './pages/pages.module';
import { AppEffects } from './store/app.effects';
import { AppStoreModule } from './store/store.module';
import { LoadingDirectiveModule } from './directives/loading-directive.module';
import { AppInjector } from './services/app-injector/app-injector.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedComponentsModule,
    PagesModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([AppEffects]),
    StoreDevtoolsModule.instrument(),
    AppStoreModule,
    LoadingDirectiveModule,
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent],
})
export class AppModule {

  constructor(
    injector: Injector
  ) {
    // Store a reference to the app injector so child components don't have to pass in dependencies for base
    AppInjector.setInjector(injector);
  }

}
