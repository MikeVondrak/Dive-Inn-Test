import { createAction, props, union } from '@ngrx/store';
import { FontWeight } from 'src/app/models/font-weight.model';

export const loadFontFamilyData = createAction(
  '[Font Library] loadFontFamilyData', 
  props<{ family: string }>()
);

export const loadFontFamilyDataWithVariants = createAction(
  '[Font Library] loadFontFamilyDataWithVariants', 
  props<{ family: string, variants: FontWeight[] }>()
);

export const fontFamilyDataLoaded = createAction(
  '[Font Library] fontFamilyDataLoaded',
  props<{ family: string }>()
);

export const fontFamilyDataError = createAction(
  '[Font Library] fontFamilyDataError',
  props<{ family: string }>()
);

const actions = union({
  loadFontFamilyData,
  fontFamilyDataLoaded,
  fontFamilyDataError,
})
export type FontLibraryActions = typeof actions;