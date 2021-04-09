import { createFeatureSelector, createSelector } from '@ngrx/store';

import { fontWeightFeatureKey, FontWeightState } from '../entity/font-weight.entity';
import * as fontWeightEntitySelectors from '../entity/font-weight.entity';

export const selectFontWeightState = createFeatureSelector<FontWeightState>(fontWeightFeatureKey);

export const getFontWeights = createSelector(selectFontWeightState, fontWeightEntitySelectors.selectAll);

export const getFontWeightById = createSelector(getFontWeights, (state, props) => {
  const fontWeight = state[props.id];
  debugger;
  return fontWeight;
})