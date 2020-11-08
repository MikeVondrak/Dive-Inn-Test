import { createReducer, on } from '@ngrx/store';
import { LoggerService } from 'src/app/services/logger/logger.service';
import { 
  ActiveFontInstanceActions, 
  setActiveFontFamily,
  setActiveFontInstance,
  setActiveFontItalic,
  setActiveFontSize,
  setActiveFontWeight 
} from '../actions/active-font-instance.actions';
import { activeFontInstanceInitialState, ActiveFontInstanceState } from '../active-font-instance.state';

const _activeFontInstanceReducer = createReducer(
  activeFontInstanceInitialState,
  on(setActiveFontInstance, (state, { fontInstance }) => 
  { 
    return ({
      ...state,
      activeFontFamily: fontInstance.family,
      activeFontWeight: fontInstance.weight,
      activeFontItalic: fontInstance.italic,
      activeFontSize: fontInstance.size.toString()
    });
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

  on(setActiveFontSize, (state, { size }) => ({ ...state, size: size }) ),
  on(setActiveFontWeight, (state, { weight }) => ({ ...state, weight: weight })),
  on(setActiveFontItalic, (state, { italic }) => ({ ...state, italic: italic })),
);
 
export function activeFontInstanceReducer(state: ActiveFontInstanceState, action: ActiveFontInstanceActions) {
  return _activeFontInstanceReducer(state, action);
}