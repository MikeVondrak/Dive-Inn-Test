import { createReducer, on } from '@ngrx/store';
import { 
  loadFontFamilyData,
  fontFamilyDataLoaded,
  FontLibraryActions
} from '../actions/font-library.actions';
import { fontLibraryInitialState, FontLibraryState } from '../font-library.state';
 
const _fontLibraryReducer = createReducer(
  fontLibraryInitialState,
  on(loadFontFamilyData, (state, { family }) => {
    console.log('+++++ FontLibrary loadFontFamilyData: ' + family);
    return ({
      ...state,
      fontDataLoading: true,
      fontDataLoaded: false,
      fontDataError: false
    });
  }),

  on(fontFamilyDataLoaded, (state) => {
    console.log('+++++ FontLibrary fontFamilyDataLoaded');
    return ({
      ...state,
      fontDataLoading: false,
      fontDataLoaded: true,
      fontDataError: false
    });
  }),
);
 
export function fontLibraryReducer(state: FontLibraryState, action: FontLibraryActions) {
  return _fontLibraryReducer(state, action);
}