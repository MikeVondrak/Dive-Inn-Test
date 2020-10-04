import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SharedComponentsModule } from './shared/components/shared-components.module';
import { PagesModule } from './pages/pages.module';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
//import { EffectsModule } from '@ngrx/effects';
//import { AppEffects } from './app.effects';
import { fontInstanceReducer } from './store/reducers/font-instance.reducer';

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
    StoreModule.forRoot({ rootStore: fontInstanceReducer }),    
    StoreDevtoolsModule.instrument(),
    //EffectsModule.forRoot([AppEffects]),
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
