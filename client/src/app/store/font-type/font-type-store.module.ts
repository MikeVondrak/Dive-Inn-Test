import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';

import { FontTypeEffectsModule } from './effects/font-type-effects.module';
import { fontTypeFeatureKey } from './entity/font-type.entity';
import * as fromFontType from './reducers/font-type.reducer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(fontTypeFeatureKey, fromFontType.reducer),
    //FontTypeEffectsModule
  ],
  //exports: [FontTypeEffectsModule]
})
export class FontTypeStoreModule { }
