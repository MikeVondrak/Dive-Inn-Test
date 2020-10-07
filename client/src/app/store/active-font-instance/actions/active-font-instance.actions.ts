import { createAction, props, union } from '@ngrx/store';
import { FontInstance } from '../../../models/font-instance.model';
import { FontWeight } from '../../../services/api/font/font.api.model';

export const setFontInstance = createAction(
  '[Font Instance] Set new FontInstance', 
  props<{ fontInstance: FontInstance }>()
);

export const setActiveFontFamily = createAction(
  '[Font Instance] Set new FontInstance family',
  props<{ family: string }>()
);
export const setActiveFontSize = createAction(
  '[Font Instance] Set new FontInstance size',
  props<{ size: string }>()
);
export const setActiveFontWeight = createAction(
  '[Font Instance] Set new FontInstance weight',
  props<{ weight: FontWeight }>()
);
export const setActiveFontItalic = createAction(
  '[Font Instance] Set new FontInstance italic',
  props<{ italic: boolean }>()
);

const actions = union({
  //setFontInstance,

  setActiveFontFamily,
  setActiveFontSize,
  setActiveFontWeight,
  setActiveFontItalic,
})
export type ActiveFontInstanceActions = typeof actions;