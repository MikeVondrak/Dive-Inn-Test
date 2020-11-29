import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../../state';
import { FontSetLibraryState } from '../font-set-library.state';

export const selectFeatureFontSetLibrary = createFeatureSelector<AppState, FontSetLibraryState>('fontSetLibrary');

export const getFontSets = createSelector(
  selectFeatureFontSetLibrary,
  (state: FontSetLibraryState) => state.fontSets
);
export const getFontSetsLoading = createSelector(
  selectFeatureFontSetLibrary,
  (state: FontSetLibraryState) => state.fontSetsLoading
);
export const getFontSetsLoaded = createSelector(
  selectFeatureFontSetLibrary,
  (state: FontSetLibraryState) => state.fontSetsLoaded
);
export const getFontSetsError = createSelector(
  selectFeatureFontSetLibrary,
  (state: FontSetLibraryState) => state.fontSetsError
);