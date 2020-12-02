import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromFontType from '../reducers/font-type.reducer';
import { fontTypeFeatureKey, FontTypeState } from '../entity/font-type.entity';
import { fontTypeAdapter } from '../entity/font-type.entity';

export const selectFontTypeState = createFeatureSelector<FontTypeState>(fontTypeFeatureKey);

export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal

} = fontTypeAdapter.getSelectors();