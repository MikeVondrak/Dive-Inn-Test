import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../../state';
import { FontInstanceState } from '../entity/font-instance.entity';
import * as fontInstanceEntitySelectors from '../entity/font-instance.entity';

export const selectFeatureFontInstanceLibrary = createFeatureSelector<AppState, FontInstanceState>('fontInstanceLibrary');

// export const getAllFontInstances = createSelector(
//   selectFeatureFontInstanceLibrary,
//   (state: FontInstanceState) => state.loadedFontInstances
// );

export const getAllFontInstances = createSelector(selectFeatureFontInstanceLibrary, fontInstanceEntitySelectors.selectAll);

export const getFontInstancesLoading = createSelector(
  selectFeatureFontInstanceLibrary,
  (state: FontInstanceState) => state.fontInstanceLoading
);
export const getFontInstancesLoaded = createSelector(
  selectFeatureFontInstanceLibrary,
  (state: FontInstanceState) => state.fontInstanceLoaded
);
export const getFontInstancesError = createSelector(
  selectFeatureFontInstanceLibrary,
  (state: FontInstanceState) => state.fontInstanceError
);

// export const getFontInstanceLoading = createSelector(
//   selectFeatureFontInstanceLibrary,
//   (state: FontInstanceState) => state.fontInstanceDataLoading
// );
// export const getFontInstanceLoaded = createSelector(
//   selectFeatureFontInstanceLibrary,
//   (state: FontInstanceState) => state.fontInstanceDataLoaded
// );
// export const getFontInstanceError = createSelector(
//   selectFeatureFontInstanceLibrary,
//   (state: FontInstanceState) => state.fontInstanceDataError
// );