import { createReducer, on } from '@ngrx/store';
import { LoggerService } from 'src/app/services/logger/logger.service';
import { 
  loadFontFamilyData,
  fontFamilyDataLoaded,
  FontLibraryActions,
  fontFamilyDataError
} from '../actions/font-library.actions';
import { fontLibraryInitialState, FontLibraryState } from '../font-library.state';
 
const debug = false;

const _fontLibraryReducer = createReducer(
  fontLibraryInitialState,
  
  on(loadFontFamilyData, (state, { family }) => {
    logger('loadFontFamilyData', family);
    return ({
      ...state,
      fontDataLoading: true,
      fontDataLoaded: false,
      fontDataError: false
    });
  }),

  on(fontFamilyDataLoaded, (state, { family }) => {
    logger('fontFamilyDataLoaded', family);
    
    const loadedFonts = [...state.loadedFonts];
    if (!state.loadedFonts.includes(family)) {
      loadedFonts.push(family);
    }
    
    const newState: FontLibraryState = {
      ...state,
      loadedFonts: loadedFonts,
      fontDataLoading: false,
      fontDataLoaded: true,
      fontDataError: false
    }
    return newState;
  }),

  on(fontFamilyDataError, (state, { family }) => {
    logger('fontFamilyDataError');
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

function logger(id: string, output?: string) {
  if (debug) {  
    const logger = new LoggerService;
    logger.enableLogger(true, 'FontLibrary');
    logger.log('reducer ' + id, output, undefined, 'FontLibrary');
  }
}