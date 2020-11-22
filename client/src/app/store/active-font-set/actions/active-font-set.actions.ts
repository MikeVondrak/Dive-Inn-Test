import { createAction, props, union } from '@ngrx/store';
import { FontTypeInstanceKvp } from 'src/app/models/font-type.model';
import { FontSet } from '../../../models/font-set.model';

export const setActiveFontSet = createAction(
  '[Font Set] setActiveFontSet',
  props<{ fontSet: FontSet }>()
);

export const setDefaultActiveFontSet = createAction('[Font Set] setDefaultActiveFontSet');

export const fontSetLoaded = createAction('[Font Set] fontSetInstancesLoaded');

export const fontSetError = createAction('[Font Set] fontSetInstancesError');

export const setActiveFontSetFontInstance = createAction(
  '[Font Set] setActiveFontSetFontInstance',
  props<{ fontTypeInstanceKvp: FontTypeInstanceKvp }>()
);

const actions = union({
  setActiveFontSet,
  setDefaultActiveFontSet,
  fontSetLoaded,
  fontSetError,
  setActiveFontSetFontInstance,
})
export type ActiveFontSetActions = typeof actions;