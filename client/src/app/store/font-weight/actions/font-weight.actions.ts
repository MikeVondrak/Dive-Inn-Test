import { createAction, props } from '@ngrx/store';
import { FontWeightApi } from 'src/app/services/api/font-weight/font-weight.api.model';

export const loadFontWeights = createAction(
  '[Font Weight] Load FontWeights'
);

export const loadFontWeightsSuccess = createAction(
  '[Font Weight] Load FontWeights Success',
  props<{ fontWeights: FontWeightApi[] }>()
);

export const loadFontWeightsFailure = createAction(
  '[Font Weight] Load FontWeights Failure',
  props<{ error: Error }>()
);
