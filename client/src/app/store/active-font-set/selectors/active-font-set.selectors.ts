import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FontSet } from '../../../models/font-set.model';
import { AppState } from '../../state';
import { ActiveFontSetState } from '../active-font-set.state';
import { featureKey } from '../feature-key';

export const selectFeatureActiveFontSet = createFeatureSelector<AppState, ActiveFontSetState>(featureKey);

export const getActiveFontSetId = createSelector(
  selectFeatureActiveFontSet,
  (state: ActiveFontSetState) => state.setId
);

export const getActiveFontSetName = createSelector(
  selectFeatureActiveFontSet,
  (state: ActiveFontSetState) => state.name
);

export const getActiveFontSetLastUpdated = createSelector(
  selectFeatureActiveFontSet,
  (state: ActiveFontSetState) => state.lastUpdated
);

export const getActiveFontSetTypeInstanceMap = createSelector(
  selectFeatureActiveFontSet,
  (state: ActiveFontSetState) => state.typeInstanceMap
);