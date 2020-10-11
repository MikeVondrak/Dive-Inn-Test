import { createAction, props, union } from '@ngrx/store';

export const loadFontFamilyData = createAction(
  '[Font Library] Ensure Font Family is Available for Use', 
  props<{ family: string }>()
);

export const fontFamilyDataLoaded = createAction(
  '[Font Library] Signal Font Family is Available for Use', 
  props<{ family: string }>()
);

const actions = union({
  loadFontFamilyData,
  fontFamilyDataLoaded
})
export type FontLibraryActions = typeof actions;