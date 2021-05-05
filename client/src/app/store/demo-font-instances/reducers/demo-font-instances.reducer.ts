import { Action, createReducer, on } from '@ngrx/store';
import * as DemoFontInstancesActions from './demo-font-instances.actions';

export const demoFontInstancesFeatureKey = 'demoFontInstances';

export interface State {

}

export const initialState: State = {

};


export const reducer = createReducer(
  initialState,

  on(DemoFontInstancesActions.loadDemoFontInstancess, state => state),

);

