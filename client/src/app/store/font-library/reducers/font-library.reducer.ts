import { createReducer, on } from '@ngrx/store';
import { LoggerService } from 'src/app/services/logger/logger.service';
import { 
  loadFontFamilyData,
  fontFamilyDataLoaded,
  FontLibraryActions,
  fontFamilyDataError
} from '../actions/font-library.actions';
import { fontLibraryInitialState, FontLibraryState } from '../font-library.state';
 
const _fontLibraryReducer = createReducer(
  fontLibraryInitialState,
  
  on(loadFontFamilyData, (state, { family }) => {
    const logger = new LoggerService;
    logger.enableLogger(true, 'FontLibrary');
    logger.log('reducer loadFontFamilyData', { "family": family }, undefined, 'FontLibrary');
    return ({
      ...state,
      fontDataLoading: true,
      fontDataLoaded: false,
      fontDataError: false
    });
  }),

  on(fontFamilyDataLoaded, (state, { family }) => {
    const logger = new LoggerService;
    logger.enableLogger(true, 'FontLibrary');
    logger.log('reducer fontFamilyDataLoaded', family, undefined, 'FontLibrary');
    return ({
      ...state,
      loadedFonts: [...state.loadedFonts, family],
      fontDataLoading: false,
      fontDataLoaded: true,
      fontDataError: false
    });
  }),

  on(fontFamilyDataError, (state, { family }) => {
    const logger = new LoggerService;
    logger.enableLogger(true, 'FontLibrary');
    logger.log('reducer fontFamilyDataLoaded', family, undefined, 'FontLibrary');
    return ({
      ...state,
      fontDataLoading: false,
      fontDataLoaded: false,
      fontDataError: true
    });
  }),
);
 
export function fontLibraryReducer(state: FontLibraryState, action: FontLibraryActions) {
  return _fontLibraryReducer(state, action);
}