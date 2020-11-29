import { createAction, props, union } from '@ngrx/store';
import { FontInstance } from '../../../models/font-instance.model';

export const loadFontInstances = createAction('[Font Instance Library] loadFontInstances');
export const fontInstancesLoaded = createAction(
  '[Font Instance Library] fontInstancesLoaded',
    props<{ allFontInstances: FontInstance[] }>()  
  );
export const fontInstancesError = createAction('[Font Instance Library] fontInstancesError');

export const loadFontInstanceById = createAction(
  '[Font Instance Library] loadFontInstanceById', 
  props<{ fontInstanceId: number }>()
);

export const fontInstanceLoaded = createAction(
  '[Font Instance Library] fontInstanceLoaded',
  props<{ fontInstance: FontInstance }>()
);

export const fontInstanceError = createAction(
  '[Font Instance Library] fontInstanceError',
  props<{ fontInstanceId: number }>()
);

const actions = union({
  loadFontInstances,
  fontInstancesLoaded,
  fontInstancesError,
  loadFontInstanceById,
  fontInstanceLoaded,
  fontInstanceError,
})
export type FontInstanceLibraryActions = typeof actions;