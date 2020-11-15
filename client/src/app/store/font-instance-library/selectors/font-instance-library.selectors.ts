import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../../state';
import { FontInstanceLibraryState } from '../font-instance-library.state';

export const selectFeatureFontInstanceLibrary = createFeatureSelector<AppState, FontInstanceLibraryState>('fontInstanceLibrary');

export const getLoadedFontInstances = createSelector(
  selectFeatureFontInstanceLibrary,
  (state: FontInstanceLibraryState) => state.loadedFontInstances
);

export const getFontInstancesLoading = createSelector(
  selectFeatureFontInstanceLibrary,
  (state: FontInstanceLibraryState) => state.fontInstancesLoading
);
export const getFontInstancesLoaded = createSelector(
  selectFeatureFontInstanceLibrary,
  (state: FontInstanceLibraryState) => state.fontInstancesLoaded
);
export const getFontInstancesError = createSelector(
  selectFeatureFontInstanceLibrary,
  (state: FontInstanceLibraryState) => state.fontInstancesError
);

export const getFontInstanceLoading = createSelector(
  selectFeatureFontInstanceLibrary,
  (state: FontInstanceLibraryState) => state.fontInstanceDataLoading
);
export const getFontInstanceLoaded = createSelector(
  selectFeatureFontInstanceLibrary,
  (state: FontInstanceLibraryState) => state.fontInstanceDataLoaded
);
export const getFontInstanceError = createSelector(
  selectFeatureFontInstanceLibrary,
  (state: FontInstanceLibraryState) => state.fontInstanceDataError
);