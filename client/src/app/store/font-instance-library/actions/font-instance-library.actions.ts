import { createAction, props, union } from '@ngrx/store';
import { FontInstanceApi } from 'src/app/services/api/font-instance/font-instance.api.model';
import { FontInstance } from '../../../models/font-instance.model';

export const loadFontInstances = createAction('[Font Instance Library] loadFontInstances');
export const fontInstancesLoaded = createAction(
  '[Font Instance Library] fontInstancesLoaded',
    props<{ allFontInstances: FontInstanceApi[] }>()  
  );
export const fontInstancesError = createAction('[Font Instance Library] fontInstancesError');

export const loadFontInstanceById = createAction(
  '[Font Instance Library] loadFontInstanceById', 
  props<{ fontInstanceId: number }>()
);

export const fontInstanceLoaded = createAction(
  '[Font Instance Library] fontInstanceLoaded',
  props<{ fontInstance: FontInstanceApi }>()
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
export type FontInstanceActions = typeof actions;