import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavBarComponent } from './shared/components/nav-bar/nav-bar.component';

import { DemoPageComponent } from './pages/demo/demo.page.component';
import { ConfigurationPageComponent } from './pages/configuration/configuration.page.component';
import { SelectionPageComponent } from './pages/selection/selection.page.component';
import { NotFoundComponent } from './pages/error/not-found/not-found.component';
import { PageLoadingComponent } from './shared/components/page-loading/page-loading.component';
import { HeaderComponent } from './shared/components/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    DemoPageComponent,
    ConfigurationPageComponent,
    SelectionPageComponent,
    NotFoundComponent,
    PageLoadingComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
