import { createReducer, on } from '@ngrx/store';
import { LoggerService } from '../../../services/logger/logger.service';
import { 
  loadFontSets,
  fontSetsLoaded,
  fontSetsError,
  FontSetActions
} from '../actions/font-set.actions';
import { fontSetAdapter, FontSetState, initialFontSetState } from '../entity/font-set.entity';
 
export const reducer = createReducer(
  initialFontSetState,
  
  on(loadFontSets, (state) => {
    logger('loadfontSets');
    return ({
      ...state,
      fontSetsLoading: true,
      fontSetsLoaded: false,
      fontSetsError: false
    });
  }),

  on(fontSetsLoaded, (state, action) => {
    const fontSets = action.fontSets;
    let newState = {
      ...state,
      fontSetsLoading: false,
      fontSetsLoaded: true
    };
    logger('fontSetsLoaded', 'count=' + fontSets.length);
    
    return fontSetAdapter.setAll(action.fontSets, newState);
  }),

  on(fontSetsError, (state) => {
    logger('fontSetsError');
    return ({
      ...state,
      fontSetsLoading: false,
      fontSetsLoaded: false,
      fontSetsError: true
    });
  }),
);

function logger(id: string, output?: string) {
  const logger = new LoggerService;
  logger.enableLogger(true, 'FontSets');
  logger.log('reducer ' + id, output, undefined, 'FontSets');
}