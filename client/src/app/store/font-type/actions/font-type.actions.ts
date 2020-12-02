import { createAction, props } from '@ngrx/store';

import { FontType } from 'src/app/models/font-type.model';


export const loadFontTypes = createAction(
  '[FontType] Load All FontTypes'
);

export const loadFontTypesSuccess = createAction(
  '[FontType] Load All FontTypes Success',
  props<{ fontTypes: FontType[] }>()
);

export const loadFontTypesFailure = createAction(
  '[FontType] Load All FontTypes Failure',
  props<{ error: Error }>()
);
