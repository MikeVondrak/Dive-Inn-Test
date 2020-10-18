import { createReducer, on } from '@ngrx/store';
import { LoggerService } from 'src/app/services/logger/logger.service';
import { 
  loadFontFamilyData,
  fontFamilyDataLoaded,
  FontLibraryActions
} from '../actions/font-library.actions';
import { fontLibraryInitialState, FontLibraryState } from '../font-library.state';
 
const _fontLibraryReducer = createReducer(
  fontLibraryInitialState,
  on(loadFontFamilyData, (state, { family }) => {
    const logger = new LoggerService;
    logger.enableLogger(true, 'FontLibrary');
    logger.log('loadFontFamilyData', { "family": family }, undefined, 'FontLibrary');
    return ({
      ...state,
      fontDataLoading: true,
      fontDataLoaded: false,
      fontDataError: false
    });
  }),

  on(fontFamilyDataLoaded, (state) => {
    const logger = new LoggerService;
    logger.enableLogger(true, 'FontLibrary');
    logger.log('fontFamilyDataLoaded', undefined, undefined, 'FontLibrary');
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