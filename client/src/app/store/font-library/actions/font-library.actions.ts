import { createAction, props, union } from '@ngrx/store';

export const loadFontFamilyData = createAction(
  '[Font Library] loadFontFamilyData', 
  props<{ family: string }>()
);

export const fontFamilyDataLoaded = createAction('[Font Library] fontFamilyDataLoaded');

const actions = union({
  loadFontFamilyData,
  fontFamilyDataLoaded
})
export type FontLibraryActions = typeof actions;