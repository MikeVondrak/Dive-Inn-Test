import { Action, createReducer, on, State } from '@ngrx/store';
import * as FontWeightActions from '../actions/font-weight.actions';
import { fontWeightAdapter, initialFontWeightState } from '../entity/font-weight.entity';

export const reducer = createReducer(
  initialFontWeightState,

  on(FontWeightActions.loadFontWeights, state => { 
    return ({ 
      ...state, 
      fontWeightsLoading: true,
      fontWeightsLoaded: false,
      fontWeightsError: false
    })
  }),
  on(FontWeightActions.loadFontWeightsSuccess, (state, action) => {
    let newState = {
      ...state,
      fontWeightsLoading: false,
      fontWeightsLoaded: true
    };
    return fontWeightAdapter.setAll(action.fontWeights, newState);
  }),
  on(FontWeightActions.loadFontWeightsFailure, (state, action) => {
    return ({
      ...state,
      fontWeightsLoading: false,
      fontWeightsError: true
    })
  }),

);

