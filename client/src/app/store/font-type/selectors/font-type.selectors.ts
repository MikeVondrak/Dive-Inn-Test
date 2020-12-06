import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromFontType from '../reducers/font-type.reducer';
import { fontTypeAdapter, fontTypeFeatureKey, FontTypeState } from '../entity/font-type.entity';
import * as fontTypeEntitySelectors from '../entity/font-type.entity';
import { FontType } from 'src/app/models/font-type.model';


export const selectFontTypeState = createFeatureSelector<FontTypeState>(fontTypeFeatureKey);

export const getAllFontTypes = createSelector(selectFontTypeState, fontTypeEntitySelectors.selectAll);