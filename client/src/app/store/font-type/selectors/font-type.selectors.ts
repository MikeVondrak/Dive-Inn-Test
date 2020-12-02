import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromFontType from '../reducers/font-type.reducer';
import { fontTypeFeatureKey, FontTypeState } from '../font-type.state';

export const selectFontTypeState = createFeatureSelector<FontTypeState>(fontTypeFeatureKey);
