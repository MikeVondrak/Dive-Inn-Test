import { createAction, props, union } from '@ngrx/store';
import { FontSet } from 'src/app/models/font-set.model';
import { FontSetApi, FontSetApiMapped } from 'src/app/services/api/font-set/font-set.api.model';

export const loadFontSets = createAction(
  '[Font Set] loadFontSets'
);

export const fontSetsLoaded = createAction(
  '[Font Set] fontSetsLoaded',
  props<{ fontSetApis: FontSetApi[] }>()
);

export const fontSetsError = createAction(
  '[Font Set] fontSetsError'
);

export const updateFontSet = createAction(
  '[Font Set] updateFontSet',
  props<{ updatedFontSetApi: FontSetApiMapped }>()
);

export const updateFontSetSuccess = createAction(
  '[Font Set] updateFontSetSuccess',
  props<{ updatedFontSetApi: FontSetApiMapped }>()
);

export const createFontSet = createAction(
  '[Font Set] createFontSet',
  props<{ newFontSetName: string }>()
);

export const deleteFontSet = createAction(
  '[Font Set] deleteFontSet',
  props<{ fontSetId: number }>()
);

export const updateFontSetName = createAction(
  '[Font Set] updateFontSetName',
  props<{ updatedFontSetName: string }>()
);

const actions = union({
  loadFontSets,
  fontSetsLoaded,
  fontSetsError,
  updateFontSet,
  createFontSet,
  deleteFontSet,
  updateFontSetName,
})
export type FontSetActions = typeof actions;