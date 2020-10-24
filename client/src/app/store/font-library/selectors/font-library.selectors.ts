import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../../state';
import { FontLibraryState } from '../font-library.state';

export const selectFeatureFontLibrary = createFeatureSelector<AppState, FontLibraryState>('fontLibrary');

export const getLoadedFonts = createSelector(
  selectFeatureFontLibrary,
  (state: FontLibraryState) => state.loadedFonts
);
export const getFontDataLoading = createSelector(
  selectFeatureFontLibrary,
  (state: FontLibraryState) => state.fontDataLoading
);
export const getFontDataLoaded = createSelector(
  selectFeatureFontLibrary,
  (state: FontLibraryState) => state.fontDataLoaded
);
export const getFontDataError = createSelector(
  selectFeatureFontLibrary,
  (state: FontLibraryState) => state.fontDataError
);