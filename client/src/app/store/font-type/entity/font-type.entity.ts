import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { FontType } from '../../../models/font-type.model';

export const fontTypeFeatureKey = 'fontTypes';
export const fontTypeAdapter = createEntityAdapter<FontType>();

export interface FontTypeState extends EntityState<FontType> {
  fontTypeLoading: boolean,
  fontTypeLoaded: boolean,
  fontTypeError: boolean
}

export const initialFontTypeState: FontTypeState = fontTypeAdapter.getInitialState({
  fontTypeLoading: false,
  fontTypeLoaded: false,
  fontTypeError: false
});

// TODO: understand how to do this export as a named object?
export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = fontTypeAdapter.getSelectors();