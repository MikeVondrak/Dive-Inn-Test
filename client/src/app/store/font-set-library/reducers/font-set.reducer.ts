import { Update } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { FontSetApi, fontSetApiMappedToFontSetApiArray } from 'src/app/services/api/font-set/font-set.api.model';
import { LoggerService } from '../../../services/logger/logger.service';
import { 
  loadFontSets,
  fontSetsLoaded,
  fontSetsError,
  FontSetActions,
  updateFontSetSuccess,
  addFontSetToLibrary
} from '../actions/font-set.actions';
import { fontSetAdapter, FontSetState, initialFontSetState } from '../entity/font-set.entity';
 
export const reducer = createReducer(
  initialFontSetState,
  
  on(loadFontSets, (state: FontSetState) => {
    logger('loadfontSets');
    return ({
      ...state,
      fontSetsLoading: true,
      fontSetsLoaded: false,
      fontSetsError: false
    });
  }),

  on(fontSetsLoaded, (state, action) => {
    const fontSetApis = action.fontSetApis;
    let newState = {
      ...state,
      fontSetsLoading: false,
      fontSetsLoaded: true
    };
    logger('fontSetsLoaded', 'count=' + fontSetApis.length);

    return fontSetAdapter.setAll(action.fontSetApis, newState);
  }),

  on(updateFontSetSuccess, (state, action) => {
    const fontSetApiMapped = action.updatedFontSetApi;
    let newState = {
      ...state,
    };
    logger('updateFontSetSuccess', 'updated set=' + JSON.stringify(fontSetApiMapped));

    // fontSetAdapter.setMany takes an array of FontSetApi
    // need to turn fontSetApiMapped into an array of FontSetApi
    const fontSetApis = fontSetApiMappedToFontSetApiArray(fontSetApiMapped);
    const updates: Update<FontSetApi>[] = fontSetApis.map((fsa) => {
      console.log('************************ FSA ID: ' + fsa.id);
      return {
        id: fsa.id,
        changes: {
          set_id: fsa.set_id,
          set_name: fsa.set_name,
          fk_font_type_id: fsa.fk_font_type_id,
          fk_font_instance_id: fsa.fk_font_instance_id,
        }
      }
    });
    return fontSetAdapter.updateMany(updates, newState);
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

  on(addFontSetToLibrary, (state, action) => {
    const fontSetApi = fontSetApiMappedToFontSetApiArray(action.fontSetApi);
    let newState = {
      ...state,
    };
    logger('addFontSetToLibrary' + action.fontSetApi.set_name);

    return fontSetAdapter.addMany(fontSetApi, newState);
  }),

);

function logger(id: string, output?: string) {
  const logger = new LoggerService;
  logger.enableLogger(true, 'FontSets');
  logger.log('reducer ' + id, output, undefined, 'FontSets');
}