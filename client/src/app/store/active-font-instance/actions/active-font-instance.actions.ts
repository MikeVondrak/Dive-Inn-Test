import { createAction, props, union } from '@ngrx/store';
import { FontInstanceApi } from 'src/app/services/api/font-instance/font-instance.api.model';
import { FontInstance } from '../../../models/font-instance.model';
import { FontWeight } from '../../../models/font-weight.model';

export const setActiveFontInstance = createAction(
  '[Font Instance] setActiveFontInstance', 
  props<{ fontInstance: FontInstance }>()
);

export const setActiveFontInstanceApi = createAction(
  '[Font Instance] setActiveFontInstanceApi', 
  props<{ fontInstanceApi: FontInstanceApi }>()
);

export const setDefaultActiveFontInstance = createAction(
  '[Font Instance] setDefaultActiveFontInstance'
);

export const setActiveFontFamily = createAction(
  '[Font Instance] setActiveFontFamily',
  props<{ family: string }>()
);
export const setActiveFontSize = createAction(
  '[Font Instance] setActiveFontSize',
  props<{ size: string }>()
);
export const setActiveFontWeight = createAction(
  '[Font Instance] setActiveFontWeight',
  props<{ weight: FontWeight }>()
);
export const setActiveFontItalic = createAction(
  '[Font Instance] setActiveFontItalic',
  props<{ italic: boolean }>()
);

const actions = union({
  setActiveFontInstance,
  setActiveFontInstanceApi,
  setDefaultActiveFontInstance,
  setActiveFontFamily,
  setActiveFontSize,
  setActiveFontWeight,
  setActiveFontItalic,
})
export type ActiveFontInstanceActions = typeof actions;