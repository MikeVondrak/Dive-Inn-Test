import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';

import { FontSetEffectsModule } from './effects/font-set-effects.module';
import { fontSetFeatureKey } from './entity/font-set.entity';
import * as fromFontSet from './reducers/font-set.reducer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(fontSetFeatureKey, fromFontSet.reducer),
    //FontSetEffectsModule
  ],
  //exports: [FontSetEffectsModule]
})
export class FontSetStoreModule { }
