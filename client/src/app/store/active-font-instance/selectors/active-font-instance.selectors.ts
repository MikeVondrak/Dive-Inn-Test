import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FontInstance } from 'src/app/models/font-instance.model';
import { FontInstanceApi } from 'src/app/services/api/font-instance/font-instance.api.model';
import { AppState } from '../../state';
import { ActiveFontInstanceState } from '../active-font-instance.state';

export const selectFeatureActiveFontInstance = createFeatureSelector<AppState, ActiveFontInstanceState>('activeFontInstance');
 
export const getActiveFontInstance = createSelector(
  selectFeatureActiveFontInstance,
  (state: ActiveFontInstanceState) => {
    const fontInstance: FontInstance = {
      id: state.activeFontInstanceId,
      family: state.activeFontFamily,
      weight: state.activeFontWeight,
      italic: state.activeFontItalic,
      size: parseInt(state.activeFontSize)
    };
    return fontInstance;
  }
);

export const getActiveFontInstanceApi = createSelector(
  selectFeatureActiveFontInstance,
  (state: ActiveFontInstanceState) => {
    const fontInstanceApi: FontInstanceApi = {
      id: state.activeFontInstanceId,
      family: state.activeFontFamily,
      fk_font_weight_id: state.activeFontWeightId,
      italic: state.activeFontItalic,
      size: parseInt(state.activeFontSize)
    };
    return fontInstanceApi;
  }
)

export const getActiveFontFamily = createSelector(
  selectFeatureActiveFontInstance,
  (state: ActiveFontInstanceState) => state.activeFontFamily
);

export const getActiveFontSize = createSelector(
  selectFeatureActiveFontInstance,
  (state: ActiveFontInstanceState) => state.activeFontSize
);

export const getActiveFontWeightId = createSelector(
  selectFeatureActiveFontInstance,
  (state: ActiveFontInstanceState) => state.activeFontWeightId
);

export const getActiveFontItalic = createSelector(
  selectFeatureActiveFontInstance,
  (state: ActiveFontInstanceState) => state.activeFontItalic
);