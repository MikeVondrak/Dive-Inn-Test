import { createAction, props, union } from '@ngrx/store';
import { FontInstance } from '../../../models/font-instance.model';
import { FontWeight } from '../../../services/api/font/font.api.model';

export const setActiveFontInstance = createAction(
  '[Font Instance] setActiveFontInstance', 
  props<{ fontInstance: FontInstance }>()
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

  setActiveFontFamily,
  setActiveFontSize,
  setActiveFontWeight,
  setActiveFontItalic,
})
export type ActiveFontInstanceActions = typeof actions;