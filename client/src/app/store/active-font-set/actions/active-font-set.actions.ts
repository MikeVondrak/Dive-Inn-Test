import { createAction, props, union } from '@ngrx/store';
import { FontInstance } from 'src/app/models/font-instance.model';
import { FontType, FontTypeInstanceIdPair, FontTypeInstanceKvp, FontTypeInstancePair } from 'src/app/models/font-type.model';
import { FontInstanceApi } from 'src/app/services/api/font-instance/font-instance.api.model';
import { FontSetApiMapped } from 'src/app/services/api/font-set/font-set.api.model';
import { FontSet } from '../../../models/font-set.model';

/**
 * Populate active font set using passed data
 */
export const setActiveFontSet = createAction(
  '[Font Set] setActiveFontSet',
  props<{ fontSet: FontSet }>()
);

/**
 * Populate active font set via store for passed ID
 * - triggers events: 
 */
export const setActiveFontSetById = createAction(
  '[Font Set] setActiveFontSetById',
  props<{ fontSetId: number }>()
);

export const setDefaultActiveFontSet = createAction('[Font Set] setDefaultActiveFontSet');

export const activeFontSetLoaded = createAction(
  '[Font Set] activeFontSetLoaded',
  props<{ fontSet: FontSetApiMapped }>()
);

export const activeFontSetError = createAction('[Font Set] activeFontSetError');

export const setActiveFontSetFontInstance = createAction(
  '[Font Set] setActiveFontSetFontInstance',
  props<{ fontType: FontType }>()
);

export const activeFontSetFontInstanceLoaded = createAction(
  '[Font Set] activeFontSetFontInstanceLoaded',
  props<{ fontTypeId: number,  fontInstanceApi: FontInstanceApi }>()
);

const actions = union({
  setActiveFontSet,
  setDefaultActiveFontSet,
  activeFontSetLoaded,
  activeFontSetError,
  setActiveFontSetFontInstance,
  activeFontSetFontInstanceLoaded
})
export type ActiveFontSetActions = typeof actions;