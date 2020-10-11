import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FontInstance } from 'src/app/models/font-instance.model';
import { AppState } from '../../state';
import { ActiveFontInstanceState } from '../active-font-instance.state';

export const selectFeatureActiveFontInstance = createFeatureSelector<AppState, ActiveFontInstanceState>('activeFontInstance');
 
export const getActiveFontInstance = createSelector(
  selectFeatureActiveFontInstance,
  (state: ActiveFontInstanceState) => {
    const fontInstance: FontInstance = {
      family: state.activeFontFamily,
      weight: state.activeFontWeight,
      italic: state.activeFontItalic,
      size: parseInt(state.activeFontSize)
    }
    return fontInstance;
  }
);

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