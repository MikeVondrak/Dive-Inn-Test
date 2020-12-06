import { createAction, props, union } from '@ngrx/store';
import { FontSet } from 'src/app/models/font-set.model';

export const loadFontSets = createAction(
  '[Font Set] loadFontSets'
);

export const fontSetsLoaded = createAction(
  '[Font Set] fontSetsLoaded',
  props<{ fontSets: FontSet[] }>()
);

export const fontSetsError = createAction(
  '[Font Set] fontSetsError'
);

export const updateFontSet = createAction(
  '[Font Set] updateFontSet',
  props<{ updatedFontSet: FontSet }>()
);

export const createFontSet = createAction(
  '[Font Set] createFontSet',
  props<{ newFontSetName: string }>()
);

export const deleteFontSet = createAction(
  '[Font Set] deleteFontSet',
  props<{ fontSetId: number }>()
);

export const changeFontSetName = createAction(
  '[Font Set] changeFontSetName',
  props<{ updatedFontSetName: string }>()
);

const actions = union({
  loadFontSets,
  fontSetsLoaded,
  fontSetsError,
  updateFontSet,
  createFontSet,
  deleteFontSet,
  changeFontSetName
})
export type FontSetActions = typeof actions;