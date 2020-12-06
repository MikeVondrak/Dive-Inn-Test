import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { FontInstance } from '../../../models/font-instance.model';

export const fontInstanceFeatureKey = 'fontInstances';
export const fontInstanceAdapter = createEntityAdapter<FontInstance>();

export interface FontInstanceState extends EntityState<FontInstance> {
  fontInstanceLoading: boolean,
  fontInstanceLoaded: boolean,
  fontInstanceError: boolean
}

export const initialFontInstanceState: FontInstanceState = fontInstanceAdapter.getInitialState({
  fontInstanceLoading: false,
  fontInstanceLoaded: false,
  fontInstanceError: false
});

// TODO: understand how to do this export as a named object?
export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = fontInstanceAdapter.getSelectors();