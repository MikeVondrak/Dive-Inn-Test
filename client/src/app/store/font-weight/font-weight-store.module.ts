import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';

import { FontWeightEffectsModule } from './effects/font-weight-effects.module';
import { fontWeightFeatureKey } from './entity/font-weight.entity';
import * as fromFontWeight from './reducers/font-weight.reducer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(fontWeightFeatureKey, fromFontWeight.reducer),
    FontWeightEffectsModule
  ],
  exports: [FontWeightEffectsModule]
})
export class FontWeightStoreModule { }
