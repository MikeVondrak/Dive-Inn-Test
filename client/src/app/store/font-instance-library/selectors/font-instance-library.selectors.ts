import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../../state';
import { FontInstanceState } from '../entity/font-instance.entity';
import * as fontInstanceEntitySelectors from '../entity/font-instance.entity'
import { FontInstanceApi } from 'src/app/services/api/font-instance/font-instance.api.model';
import { FontInstance } from 'src/app/models/font-instance.model';

export const selectFeatureFontInstanceLibrary = createFeatureSelector<AppState, FontInstanceState>('fontInstanceLibrary');

export const getFontInstances = createSelector(
  selectFeatureFontInstanceLibrary,
  fontInstanceEntitySelectors.selectAll
);

export const getFontInstancesLoading = createSelector(
  selectFeatureFontInstanceLibrary,
  (state: FontInstanceState) => state.fontInstancesLoading
);
export const getFontInstancesLoaded = createSelector(
  selectFeatureFontInstanceLibrary,
  (state: FontInstanceState) => state.fontInstancesLoaded
);
export const getFontInstancesError = createSelector(
  selectFeatureFontInstanceLibrary,
  (state: FontInstanceState) => state.fontInstancesError
);

export const getFontInstanceLoading = createSelector(
  selectFeatureFontInstanceLibrary,
  (state: FontInstanceState) => state.fontInstanceUpdating
);
export const getFontInstanceLoaded = createSelector(
  selectFeatureFontInstanceLibrary,
  (state: FontInstanceState) => state.fontInstanceUpdated
);
export const getFontInstanceError = createSelector(
  selectFeatureFontInstanceLibrary,
  (state: FontInstanceState) => state.fontInstanceUpdateError
);
