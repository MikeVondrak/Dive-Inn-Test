import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../../state';
import { FontSetState } from '../entity/font-set.entity';
import * as fontSetEntitySelectors from '../entity/font-set.entity';

export const selectFeatureFontSets = createFeatureSelector<AppState, FontSetState>('fontSets');

export const getFontSets = createSelector(
  selectFeatureFontSets,
  fontSetEntitySelectors.selectAll
);
export const getFontSetsLoading = createSelector(
  selectFeatureFontSets,
  (state: FontSetState) => state?.fontSetsLoading
);
export const getFontSetsLoaded = createSelector(
  selectFeatureFontSets,
  (state: FontSetState) => state?.fontSetsLoaded
);
export const getFontSetsError = createSelector(
  selectFeatureFontSets,
  (state: FontSetState) => state?.fontSetsError
);