import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { FontInstance } from '../../../models/font-instance.model';

export const fontInstanceFeatureKey = 'fontInstances';
export const fontInstanceAdapter = createEntityAdapter<FontInstance>();

export interface FontInstanceState extends EntityState<FontInstance> {  
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
