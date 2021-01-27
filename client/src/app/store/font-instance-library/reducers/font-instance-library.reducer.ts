import { createReducer, on } from '@ngrx/store';
import { LoggerService } from 'src/app/services/logger/logger.service';
import { FontInstanceActions } from '../actions/font-instance-library.actions';
import * as FontInstanceAction from '../actions/font-instance-library.actions';
import { fontInstanceAdapter, FontInstanceState } from '../entity/font-instance.entity';
import { initialFontInstanceState } from '../entity/font-instance.entity';
import { activeFontSetFontInstanceLoaded } from '../../active-font-set/actions/active-font-set.actions';
import { FontInstanceApi } from 'src/app/services/api/font-instance/font-instance.api.model';
 
const _fontInstanceLibraryReducer = createReducer(
  initialFontInstanceState,
  
  on(FontInstanceAction.loadFontInstances, (state) => {
    logger('loadFontInstances');
    return ({
      ...state,
      fontInstanceLoading: true,
    });
  }),
  on(FontInstanceAction.fontInstancesLoaded, (state, action) => {
    logger('fontInstancesLoaded');
    let newState = {
      ...state,
      fontInstancesLoading: false,
      fontInstancesLoaded: true
    };
    return fontInstanceAdapter.setAll(action.allFontInstances, newState);

  }),
  on(FontInstanceAction.fontInstancesError, (state) => {
    logger('fontInstancesError');
    return ({
      ...state,
      fontInstanceLoading: false,
      fontInstanceError: true,
    });
  }),
  
  on(FontInstanceAction.loadFontInstanceById, (state, { fontInstanceId }) => {
    logger('loadFontInstanceById', 'family: ' + fontInstanceId );
    return ({
      ...state,
      fontInstanceDataLoading: true,
      fontInstanceDataLoaded: false,
      fontInstanceDataError: false
    });
  }),

  on(FontInstanceAction.fontInstanceLoaded, (state, action) => {
    logger('fontInstanceLoaded', action.fontInstance.family);
    const newState = {
      ...state,
      fontInstanceDataLoading: false,
      fontInstanceDataLoaded: true,
      fontInstanceDataError: false
    };
    return fontInstanceAdapter.addOne(action.fontInstance, state);
  }),

  on(FontInstanceAction.fontInstanceError, (state) => {
    logger('fontInstanceError');
    return ({
      ...state,
      fontInstanceDataLoading: false,
      fontInstanceDataLoaded: false,
      fontInstanceDataError: true
    });
  }),

  on(activeFontSetFontInstanceLoaded, (state, action) => {
    const fontInstanceApi = action.fontInstanceApi;
    logger('activeFontSetFontInstanceLoaded type: ' + action.fontTypeId, JSON.stringify(fontInstanceApi));
    return fontInstanceAdapter.upsertOne(fontInstanceApi, state);
  })
);
 
export function fontInstanceLibraryReducer(state: FontInstanceState, action: FontInstanceActions) {
  return _fontInstanceLibraryReducer(state, action);
}

function logger(id: string, output?: string) {
  const logger = new LoggerService;
  logger.enableLogger(true, 'FontInstanceLibrary');
  logger.log('reducer ' + id, output, undefined, 'FontInstanceLibrary');
}