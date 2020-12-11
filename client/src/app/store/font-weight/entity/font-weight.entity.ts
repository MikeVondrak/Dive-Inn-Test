import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { FontWeightApi } from '../../../services/api/font-weight/font-weight.api.model';

export const fontWeightFeatureKey = 'fontWeights';
export const fontWeightAdapter = createEntityAdapter<FontWeightApi>();

export interface FontWeightState extends EntityState<FontWeightApi> {
  fontWeightsLoading: boolean,
  fontWeightsLoaded: boolean,
  fontWeightsError: boolean
}

export const initialFontWeightState: FontWeightState = fontWeightAdapter.getInitialState({
  fontWeightsLoading: false,
  fontWeightsLoaded: false,
  fontWeightsError: false
});

// TODO: understand how to do this export as a named object?
export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = fontWeightAdapter.getSelectors();