import { createReducer, on } from '@ngrx/store';
import { LoggerService } from '../../../services/logger/logger.service';
import { 
  loadFontSets,
  fontSetsLoaded,
  fontSetsError,
  FontSetActions
} from '../actions/font-set.actions';
import { FontSetState, initialFontSetState } from '../entity/font-set.entity';
 
export const reducer = createReducer(
  initialFontSetState,
  
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