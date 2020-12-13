import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { FontInstanceApi } from 'src/app/services/api/font-instance/font-instance.api.model';

export const fontInstanceFeatureKey = 'fontInstances';
export const fontInstanceAdapter = createEntityAdapter<FontInstanceApi>();

export interface FontInstanceState extends EntityState<FontInstanceApi> {  
  readonly fontInstancesLoading: boolean,
  readonly fontInstancesLoaded: boolean,
  readonly fontInstancesError: boolean

  readonly fontInstanceUpdating: boolean,
  readonly fontInstanceUpdated: boolean,
  readonly fontInstanceUpdateError: boolean,
}

export const initialFontInstanceState: FontInstanceState = fontInstanceAdapter.getInitialState({
  fontInstancesLoading: false,
  fontInstancesLoaded: false,
  fontInstancesError: false,
  fontInstanceUpdating: false,
  fontInstanceUpdated: false,
  fontInstanceUpdateError: false,
});

// TODO: understand how to do this export as a named object?
export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = fontInstanceAdapter.getSelectors();
