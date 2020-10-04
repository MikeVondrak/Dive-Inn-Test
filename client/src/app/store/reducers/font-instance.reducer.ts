import { createReducer, on } from '@ngrx/store';
import { 
  FontInstanceActions, 
  // googleFontError, 
  // googleFontLoaded, 
  // googleFontLoading,
  // googleFontRequested,
  // setFontInstance,
  setPreviewFontFamily,
  setPreviewFontItalic,
  setPreviewFontSize,
  setPreviewFontWeight 
} from '../actions/font-instance.actions';
import { initialState, AppState } from '../state';
 
const _fontInstanceReducer = createReducer(
  initialState,
  // on(setFontInstance, (state, { fontInstance }) => 
  // { 
  //   //debugger;
  //   return ({
  //     ...state,
  //     fontInstance: { ...fontInstance },
  //   });
  // }
  // ),

  on(setPreviewFontFamily, (state, { family }) => 
  {
    debugger;
    const newState = {
      ...state,
      previewFontFamily: family
    };
    console.log('&&&&& NEW STATE: ' + JSON.stringify(newState, null, 4));
    return newState;
  }
  ),

  on(setPreviewFontSize, (state, { size }) => ({ ...state, size: size }) ),
  on(setPreviewFontWeight, (state, { weight }) => ({ ...state, weight: weight })),
  on(setPreviewFontItalic, (state, { italic }) => ({ ...state, italic: italic })),

  // on(googleFontRequested, (state) => ({ ...state, size: size })),
  // on(googleFontLoading, (state) => ({ ...state, size: size })),
  // on(googleFontLoaded, (state) => ({ ...state, size: size })),
  // on(googleFontError, (state) => ({ ...state, size: size })),
);
 
export function fontInstanceReducer(state: AppState, action: FontInstanceActions) {
  return _fontInstanceReducer(state, action);
}