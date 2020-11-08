import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FontSet } from '../../../models/font-set.model';
import { AppState } from '../../state';
import { ActiveFontSetState } from '../active-font-Set.state';

export const selectFeatureActiveFontSet = createFeatureSelector<AppState, ActiveFontSetState>('activeFontSet');

export const getActiveFontSet = createSelector(
  selectFeatureActiveFontSet,
  (state: ActiveFontSetState) => state.activeFontSet
);