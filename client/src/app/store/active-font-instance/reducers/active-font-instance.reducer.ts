import { createReducer, on } from '@ngrx/store';
import { LoggerService } from 'src/app/services/logger/logger.service';
import { 
  ActiveFontInstanceActions, 
  setActiveFontFamily,
  setActiveFontInstance,
  setActiveFontInstanceApi,
  setActiveFontItalic,
  setActiveFontSize,
  setActiveFontWeight 
} from '../actions/active-font-instance.actions';
import { activeFontInstanceInitialState, ActiveFontInstanceState } from '../active-font-instance.state';

const _activeFontInstanceReducer = createReducer(
  activeFontInstanceInitialState,
  on(setActiveFontInstanceApi, (state, { fontInstanceApi }) => 
  { 
    const r = {
      ...state,
      activeFontFamily: fontInstanceApi.family,
      // activeFontWeight: fontInstanceApi.weight, TODO: REMOVE EVERYWHERE
      activeFontWeightId: fontInstanceApi.fk_font_weight_id,
      activeFontItalic: fontInstanceApi.italic,
      activeFontSize: fontInstanceApi.size.toString()
    }
    return (r);
  }
  ),

  on(setActiveFontFamily, (state, { family }) => 
  {
    const newState = {
      ...state,
      activeFontFamily: family
    };
    return newState;
  }
  ),

  // on(setActiveFontSize, (state, { size }) => ({ ...state, size: size }) ),
  // on(setActiveFontWeight, (state, { weight }) => ({ ...state, weight: weight })),
  // on(setActiveFontItalic, (state, { italic }) => ({ ...state, italic: italic })),
);
 
export function activeFontInstanceReducer(state: ActiveFontInstanceState, action: ActiveFontInstanceActions) {
  return _activeFontInstanceReducer(state, action);
}