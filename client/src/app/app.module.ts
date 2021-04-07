import { BrowserModule } from '@angular/platform-browser';
import { Injector, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { AppInjector } from './services/app-injector/app-injector.service';

import { ChangeNameModalContentComponent } from './pages/selection/components/change-name-modal-content/change-name-modal-content.component';
import { NewSetNameModalContentComponent } from './pages/selection/components/new-set-name-modal-content/new-set-name-modal-content.component';
import { ModalTemplateComponent } from './shared/components/modal-template/modal-template.component';

import { LoadingDirectiveModule } from './directives/loading/loading-directive.module';
import { PaginationDirectiveModule } from './directives/pagination/pagination.directive.module';
import { StyleFontDirectiveModule } from './directives/style-font/style-font.directive.module';

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
    FormsModule,
    ReactiveFormsModule,
    PaginationDirectiveModule,
    StyleFontDirectiveModule
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent],
  entryComponents: [ModalTemplateComponent, ChangeNameModalContentComponent, NewSetNameModalContentComponent]
})
export class AppModule {

  constructor(
    injector: Injector
  ) {
    // Store a reference to the app injector so child components don't have to pass in dependencies for base
    AppInjector.setInjector(injector);
  }

}
