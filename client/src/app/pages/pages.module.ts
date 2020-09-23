import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemoPageComponent } from './demo/demo.page.component';
import { ConfigurationPageComponent } from './configuration/configuration.page.component';
import { SelectionPageComponent } from './selection/selection.page.component';
import { NotFoundComponent } from './error/not-found/not-found.component';
import { FontSetSelectorComponent } from './selection/components/font-set-selector/font-set-selector.component';
import { SharedComponentsModule } from '../shared/components/shared-components.module';

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