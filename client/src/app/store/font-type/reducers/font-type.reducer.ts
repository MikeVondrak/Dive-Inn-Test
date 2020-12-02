import { Action, createReducer, on } from '@ngrx/store';
import * as FontTypeActions from '../actions/font-type.actions';
import { initialState } from '../font-type.state';

export const reducer = createReducer(
  initialState,

  on(FontTypeActions.loadFontTypes, state => state),
  on(FontTypeActions.loadFontTypesSuccess, (state, action) => state),
  on(FontTypeActions.loadFontTypesFailure, (state, action) => state),

);

