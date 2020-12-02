import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontTypeEffectsModule } from './effects/font-type-effects.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FontTypeEffectsModule
  ],
  exports: [FontTypeEffectsModule]
})
export class FontTypeStoreModule { }
