import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FontSet } from '../../../models/font-set.model';
import { AppState } from '../../state';
import { ActiveFontSetState } from '../active-font-Set.state';
import { featureKey } from '../feature-key';

export const selectFeatureActiveFontSet = createFeatureSelector<AppState, ActiveFontSetState>(featureKey);

// export const getActiveFontSet = createSelector(
//   selectFeatureActiveFontSet,
//   (state: ActiveFontSetState) => {
//     return state.activeFontSet
//   }
// );

export const getActiveFontSetId = createSelector(
  selectFeatureActiveFontSet,
  (state: ActiveFontSetState) => state.setId
);

export const getActiveFontSetName = createSelector(
  selectFeatureActiveFontSet,
  (state: ActiveFontSetState) => state.name
);