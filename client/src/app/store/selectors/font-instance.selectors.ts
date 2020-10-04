import { createSelector } from '@ngrx/store';
import { AppState } from '../state';


export const selectRoot = (state: AppState) => state['rootStore'];

export const selectAppState = (state: AppState) => state;

// export const fontInstance = (state: AppState) => state.fontInstance;

export const previewFontFamily = (state: AppState) => state.previewFontFamily;
export const previewFontSize = (state: AppState) => state.previewFontSize;
// export const previewFontWeight = (state: AppState) => state.previewFontWeight;
export const previewFontItalic = (state: AppState) => state.previewFontItalic;

// export const googleFontRequested = (state: AppState) => state.googleFontRequested;
// export const googleFontLoading = (state: AppState) => state.googleFontLoading;
// export const googleFontLoaded = (state: AppState) => state.googleFontLoaded;
// export const googleFontError = (state: AppState) => state.googleFontError;
 
// export const getFontInstance = createSelector(
//   selectRoot,
//   (state: AppState) => state.fontInstance
// );

export const getPreviewFontFamily = createSelector(
  selectRoot,
  (state: AppState) => state.previewFontFamily
);