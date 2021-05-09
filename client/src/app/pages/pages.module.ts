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
import { fontInstanceLibraryReducer } from '../store/font-instance-library/reducers/font-instance-library.reducer';
import { LoadingDirectiveModule } from '../directives/loading/loading-directive.module';
import { FontSetListComponent } from './selection/components/font-set-list/font-set-list.component';
import { FontTypeInstanceLoaderComponent } from './selection/components/font-type-instance-loader/font-type-instance-loader.component';
import { NewSetNameModalContentComponent } from './selection/components/new-set-name-modal-content/new-set-name-modal-content.component';
import { ChangeNameModalContentComponent } from './selection/components/change-name-modal-content/change-name-modal-content.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationDirectiveModule } from '../directives/pagination/pagination.directive.module';
import { StyleFontDirectiveModule } from '../directives/style-font/style-font.directive.module';
import { NavComponent } from './demo/nav/nav.component';

@NgModule({
  declarations: [
    DemoPageComponent,
    ConfigurationPageComponent,
    SelectionPageComponent,
    NotFoundComponent,
    FontSetSelectorComponent,
    FontSetListComponent,
    FontTypeInstanceLoaderComponent,
    NewSetNameModalContentComponent,
    ChangeNameModalContentComponent,
    NavComponent,
  ],
  imports: [
    CommonModule,
    SharedComponentsModule,
    StoreModule.forFeature('activeFontInstance', activeFontInstanceReducer),
    StoreModule.forFeature('fontLibrary', fontLibraryReducer),
    StoreModule.forFeature('fontInstanceLibrary', fontInstanceLibraryReducer),
    LoadingDirectiveModule,
    PaginationDirectiveModule,
    FormsModule,
    ReactiveFormsModule,
    StyleFontDirectiveModule,
  ],
  providers: [],
  exports: [
    DemoPageComponent,
    ConfigurationPageComponent,
    SelectionPageComponent,
    NotFoundComponent,
    FontSetSelectorComponent,
  ],
  entryComponents: [
    NewSetNameModalContentComponent
  ]
})
export class PagesModule { }
