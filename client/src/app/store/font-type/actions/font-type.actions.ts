import { createAction, props } from '@ngrx/store';

export const loadFontTypes = createAction(
  '[FontType] Load FontTypes'
);

export const loadFontTypesSuccess = createAction(
  '[FontType] Load FontTypes Success',
  props<{ data: any }>()
);

export const loadFontTypesFailure = createAction(
  '[FontType] Load FontTypes Failure',
  props<{ error: any }>()
);
