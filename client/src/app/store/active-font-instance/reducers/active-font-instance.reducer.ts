import { createReducer, on } from '@ngrx/store';
import { 
  ActiveFontInstanceActions, 
  setActiveFontFamily,
  setActiveFontItalic,
  setActiveFontSize,
  setActiveFontWeight 
} from '../actions/active-font-instance.actions';
import { activeFontInstanceInitialState, ActiveFontInstanceState } from '../active-font-instance.state';
 
const _activeFontInstanceReducer = createReducer(
  activeFontInstanceInitialState,
  // on(setFontInstance, (state, { fontInstance }) => 
  // { 
  //   //debugger;
  //   return ({
  //     ...state,
  //     fontInstance: { ...fontInstance },
  //   });
  // }
  // ),

  on(setActiveFontFamily, (state, { family }) => 
  {
    debugger;
    const newState = {
      ...state,
      activeFontFamily: family
    };
    console.log('&&&&& NEW STATE: ' + JSON.stringify(newState, null, 4));
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