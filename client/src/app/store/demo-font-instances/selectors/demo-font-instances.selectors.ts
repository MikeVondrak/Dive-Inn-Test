import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromDemoFontInstances from './demo-font-instances.reducer';

export const selectDemoFontInstancesState = createFeatureSelector<fromDemoFontInstances.State>(
  fromDemoFontInstances.demoFontInstancesFeatureKey
);
