import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../../state';
import { ActiveFontInstanceState } from '../active-font-instance.state';

export const selectFeatureActiveFontInstance = createFeatureSelector<AppState, ActiveFontInstanceState>('activeFontInstance');
 
// export const getFontInstance = createSelector(
//   selectFeatureFontInstance,
//   (state: ActiveFontInstanceState) => state.fontInstance
// );

export const getActiveFontFamily = createSelector(
  selectFeatureActiveFontInstance,
  (state: ActiveFontInstanceState) => state.activeFontFamily
);

export const getActiveFontSize = createSelector(
  selectFeatureActiveFontInstance,
  (state: ActiveFontInstanceState) => state.activeFontSize
);

export const getActiveFontWeight = createSelector(
  selectFeatureActiveFontInstance,
  (state: ActiveFontInstanceState) => state.activeFontWeight
);

export const getActiveFontItalic = createSelector(
  selectFeatureActiveFontInstance,
  (state: ActiveFontInstanceState) => state.activeFontItalic
);