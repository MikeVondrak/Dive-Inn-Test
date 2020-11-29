import { createReducer, on } from '@ngrx/store';
import { LoggerService } from '../../../services/logger/logger.service';
import { 
  loadFontSets,
  fontSetsLoaded,
  fontSetsError,
  FontSetLibraryActions
} from '../actions/font-set-library.actions';
import { FontSetLibraryState, fontSetLibraryInitialState } from '../font-set-library.state';
 
const _FontSetReducer = createReducer(
  fontSetLibraryInitialState,
  
  on(loadFontSets, (state) => {
    const logger = new LoggerService;
    logger.enableLogger(true, 'FontSetLibrary');
    logger.log('reducer loadfontSets', undefined, undefined, 'FontSetLibrary');
    return ({
      ...state,
      fontSetsLoading: true,
      fontSetsLoaded: false,
      fontSetsError: false
    });
  }),

  on(fontSetsLoaded, (state) => {
    const logger = new LoggerService;
    logger.enableLogger(true, 'FontSetLibrary');
    logger.log('reducer fontSetsLoaded', undefined, undefined, 'FontSetLibrary');
    return ({
      ...state,
      fontSetsLoading: false,
      fontSetsLoaded: true,
      fontSetsError: false
    });
  }),

  on(fontSetsError, (state) => {
    const logger = new LoggerService;
    logger.enableLogger(true, 'FontSetLibrary');
    logger.log('reducer fontSetsError', undefined, undefined, 'FontSetLibrary');
    return ({
      ...state,
      fontSetsLoading: false,
      fontSetsLoaded: false,
      fontSetsError: true
    });
  }),
);
 
export function FontSetReducer(state: FontSetLibraryState, action: FontSetLibraryActions) {
  return _FontSetReducer(state, action);
}