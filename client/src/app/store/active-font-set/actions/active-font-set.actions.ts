import { createAction, props, union } from '@ngrx/store';
import { FontSet } from '../../../models/font-set.model';

export const setActiveFontSet = createAction(
  '[Font Set] setActiveFontSet', 
  props<{ fontSet: FontSet }>()
);

const actions = union({
  setActiveFontSet,
})
export type ActiveFontSetActions = typeof actions;