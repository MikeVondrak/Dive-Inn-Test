import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { featureKey } from './feature-key';
import * as fromFontSet from './reducers/active-font-set.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature(featureKey, fromFontSet.activeFontSetReducer)
  ],
})
export class ActiveFontSetModule {}