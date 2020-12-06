import { createAction, props } from '@ngrx/store';

import { FontType } from 'src/app/models/font-type.model';


export const loadFontTypes = createAction(
  '[Font Type] Load All FontTypes'
);

export const loadFontTypesSuccess = createAction(
  '[Font Type] Load All FontTypes Success',
  props<{ fontTypes: FontType[] }>()
);

export const loadFontTypesFailure = createAction(
  '[Font Type] Load All FontTypes Failure',
  props<{ error: Error }>()
);
