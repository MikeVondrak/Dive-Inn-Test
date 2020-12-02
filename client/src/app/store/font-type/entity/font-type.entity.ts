import { FontType } from '../../../models/font-type.model';
import { createEntityAdapter, EntityState } from '@ngrx/entity';


export const fontTypeFeatureKey = 'fontType';
export const fontTypeAdapter = createEntityAdapter<FontType>();

export interface FontTypeState extends EntityState<FontType> {
  // extended shape is:
  // EntityState<V> { 
  //   ids: string[] | number[]; 
  //   entities: { 
  //     [id: string | nunber]: V }; 
  // }

  fontTypeLoading: boolean,
  fontTypeLoaded: boolean,
  fontTypeError: boolean
}

export const initialFontTypeState: FontTypeState = fontTypeAdapter.getInitialState({
  fontTypeLoading: false,
  fontTypeLoaded: false,
  fontTypeError: false
});