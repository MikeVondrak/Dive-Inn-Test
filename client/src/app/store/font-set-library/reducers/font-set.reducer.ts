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

  on(fontSetsLoaded, (state, { fontSets }) => {
    logger('fontSetsLoaded', fontSets.length.toString());
    let newState = {
      ...state,
      fontSetsLoading: false,
      fontSetsLoaded: true
    };
    return fontSetAdapter.setAll(fontSets, newState);
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
  const context = 'FontSetLibrary';
  const logger = new LoggerService;
  logger.enableLogger(true, context);
  logger.log('reducer ' + id, output, undefined, context);
}