import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { FontSetApi, FontSetApiMapped } from 'src/app/services/api/font-set/font-set.api.model';
import { FontSet } from '../../../models/font-set.model';
import { AppState } from '../../state';
import { ActiveFontSetState } from '../active-font-set.state';
import { featureKey } from '../feature-key';
import { FontTypeInstanceIdPair, FontTypeInstanceMap } from '../../../models/font-type.model';

export const selectFeatureActiveFontSet = createFeatureSelector<AppState, ActiveFontSetState>(featureKey);

export const getActiveFontSet: MemoizedSelector<AppState, FontSetApiMapped> = createSelector(
  selectFeatureActiveFontSet,
  (state: ActiveFontSetState) => {

    const fontSet: FontSetApiMapped = {
      set_id: state.setId,
      set_name: state.name,
      typeInstanceIdMap : [...state.fontTypeInstanceIds]
    }
    return fontSet;
  }
)

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

export const getActiveFontSetTypeInstanceIds = createSelector(
  selectFeatureActiveFontSet,
  (state: ActiveFontSetState) => state.fontTypeInstanceIds
);
