import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FontSet } from '../../../models/font-set.model';
import { AppState } from '../../state';
import { ActiveFontSetState } from '../active-font-set.state';
import { featureKey } from '../feature-key';

export const selectFeatureActiveFontSet = createFeatureSelector<AppState, ActiveFontSetState>(featureKey);

export const getActiveFontSet = createSelector(
  selectFeatureActiveFontSet,
  (state: ActiveFontSetState) => {
    // const tiMap = state.typeInstances.map(ti => {
    //   return [ti[0], ti[1]];
    // });
    const fontSet: FontSet = {
      id: state.id,
      setId: state.setId,
      name: state.name,
      lastUpdated: state.lastUpdated,
      typeInstanceMap : new Map() // !!!!!!!!!!!!!!!!!!!!!!!!!!!!
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

// export const getActiveFontSetTypeInstances = createSelector(
//   selectFeatureActiveFontSet,
//   (state: ActiveFontSetState) => state.typeInstances
// );

export const getActiveFontSetFontInstances = createSelector(
  selectFeatureActiveFontSet,
  (state: ActiveFontSetState) => state.fontInstances
)