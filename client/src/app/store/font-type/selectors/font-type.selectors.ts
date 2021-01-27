import { createFeatureSelector, createSelector } from '@ngrx/store';

import { fontTypeFeatureKey, FontTypeState } from '../entity/font-type.entity';
import * as fontTypeEntitySelectors from '../entity/font-type.entity';


export const selectFontTypeState = createFeatureSelector<FontTypeState>(fontTypeFeatureKey);

export const getAllFontTypes = createSelector(selectFontTypeState, fontTypeEntitySelectors.selectAll);

export const getFontTypesLoaded = createSelector(selectFontTypeState, (state) => state.fontTypeLoaded);