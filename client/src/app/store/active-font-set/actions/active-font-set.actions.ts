import { createAction, props, union } from '@ngrx/store';
import { FontSet } from '../../../models/font-set.model';

export const setActiveFontSet = createAction(
  '[Font Set] setActiveFontSet',
  props<{ fontSet: FontSet }>()
);

export const setDefaultActiveFontSet = createAction('[Font Set] setDefaultActiveFontSet');

const actions = union({
  setActiveFontSet,
  setDefaultActiveFontSet,
})
export type ActiveFontSetActions = typeof actions;