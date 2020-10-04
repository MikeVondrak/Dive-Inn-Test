import { createAction, props, union } from '@ngrx/store';
import { FontInstance } from '../../models/font-instance.model';
import { FontWeight } from '../../services/api/font/font.api.model';

export const setFontInstance = createAction(
  '[Font Instance] Set new FontInstance', 
  props<{ fontInstance: FontInstance }>()
);

export const setPreviewFontFamily = createAction(
  '[Font Instance] Set new FontInstance family',
  props<{ family: string }>()
);
export const setPreviewFontSize = createAction(
  '[Font Instance] Set new FontInstance size',
  props<{ size: string }>()
);
export const setPreviewFontWeight = createAction(
  '[Font Instance] Set new FontInstance weight',
  props<{ weight: FontWeight }>()
);
export const setPreviewFontItalic = createAction(
  '[Font Instance] Set new FontInstance italic',
  props<{ italic: boolean }>()
);

// export const googleFontRequested = createAction('[Google Font] Requested');
// export const googleFontLoading = createAction('[Google Font] Loading');
// export const googleFontLoaded = createAction('[Google Font] Loaded');
// export const googleFontError = createAction('[Google Font] Error');


const actions = union({
  setFontInstance,

  setPreviewFontFamily,
  setPreviewFontSize,
  setPreviewFontWeight,
  setPreviewFontItalic,

  // googleFontRequested,
  // googleFontLoading,
  // googleFontLoaded,
  // googleFontError,
})
export type FontInstanceActions = typeof actions;