import { EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { FontType } from 'src/app/models/font-type.model';
import * as FontTypeActions from '../actions/font-type.actions';
import { fontTypeAdapter } from '../entity/font-type.entity';
import { initialFontTypeState } from '../entity/font-type.entity';

export const reducer = createReducer(
  initialFontTypeState,

  on(FontTypeActions.loadFontTypes, (state) => {
    return ({
      ...state,
      fontTypeLoading: true      
    });
  }),
  on(FontTypeActions.loadFontTypesSuccess, (state, action) => {
    let newState = {
      ...state,
      fontTypeLoading: false,
      fontTypeLoaded: true
    };
    return fontTypeAdapter.setAll(action.fontTypes, newState);
  }),
  on(FontTypeActions.loadFontTypesFailure, (state, action) => {
    return ({ 
      ...state, 
      fontTypeLoading: false, 
      fontTypeError: true 
    });
  }),
);
