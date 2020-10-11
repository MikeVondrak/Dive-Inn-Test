import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';

import { DemoPageComponent } from './demo/demo.page.component';
import { ConfigurationPageComponent } from './configuration/configuration.page.component';
import { SelectionPageComponent } from './selection/selection.page.component';
import { NotFoundComponent } from './error/not-found/not-found.component';
import { FontSetSelectorComponent } from './selection/components/font-set-selector/font-set-selector.component';
import { SharedComponentsModule } from '../shared/components/shared-components.module';

import { activeFontInstanceReducer } from '../store/active-font-instance/reducers/active-font-instance.reducer';
import { fontLibraryReducer } from '../store/font-library/reducers/font-library.reducer';

@NgModule({
  declarations: [
    DemoPageComponent,
    ConfigurationPageComponent,
    SelectionPageComponent,
    NotFoundComponent,
    FontSetSelectorComponent,
  ],
  imports: [
    CommonModule,
    SharedComponentsModule,
    StoreModule.forFeature('activeFontInstance', activeFontInstanceReducer),
    StoreModule.forFeature('fontLibrary', fontLibraryReducer),
  ],
  providers: [],
  exports: [
    DemoPageComponent,
    ConfigurationPageComponent,
    SelectionPageComponent,
    NotFoundComponent,
    FontSetSelectorComponent,
  ]
})
export class PagesModule { }
