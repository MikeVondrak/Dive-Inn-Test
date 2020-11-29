import { createAction, props, union } from '@ngrx/store';
import { FontSet } from 'src/app/models/font-set.model';

export const loadFontSets = createAction(
  '[Font Set Library] loadFontSetData'
);

export const fontSetsLoaded = createAction(
  '[Font Set Library] fontSetsLoaded'
);

export const fontSetsError = createAction(
  '[Font Set Library] fontSetsError'
);

export const updateFontSet = createAction(
  '[Font Set Library] updateFontSet',
  props<{ updatedFontSet: FontSet }>()
);

export const createFontSet = createAction(
  '[Font Set Library] createFontSet',
  props<{ newFontSetName: string }>()
);

export const changeFontSetName = createAction(
  '[Font Set Library] changeFontSetName',
  props<{ updatedFontSetName: string }>()
);

const actions = union({
  loadFontSets,
  fontSetsLoaded,
  fontSetsError,
  updateFontSet,
  createFontSet,
  changeFontSetName
})
export type FontSetLibraryActions = typeof actions;