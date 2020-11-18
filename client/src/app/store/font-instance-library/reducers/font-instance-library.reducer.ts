import { createReducer, on } from '@ngrx/store';
import { LoggerService } from 'src/app/services/logger/logger.service';
import {
  loadFontInstances,
  fontInstancesLoaded,
  fontInstancesError,
  loadFontInstanceById,
  fontInstanceLoaded,
  fontInstanceError,
  FontInstanceLibraryActions,
} from '../actions/font-instance-library.actions';
import { fontInstanceLibraryInitialState, FontInstanceLibraryState } from '../font-instance-library.state';
 
const _fontInstanceLibraryReducer = createReducer(
  fontInstanceLibraryInitialState,
  
  on(loadFontInstances, (state) => {
    logger('loadFontInstances');
    return ({
      ...state,
      fontInstancesLoading: true,
    });
  }),
  on(fontInstancesLoaded, (state, { allFontInstances }) => {
    logger('fontInstancesLoaded');
    return ({
      ...state,
      fontInstancesLoading: false,
      fontInstancesLoaded: true,
      loadedFontInstances: [...allFontInstances]
    });
  }),
  on(fontInstancesError, (state) => {
    logger('fontInstancesError');
    return ({
      ...state,
      fontInstancesLoading: false,
      fontInstancesError: true,
    });
  }),
  
  on(loadFontInstanceById, (state, { fontInstanceId }) => {
    const logger = new LoggerService;
    logger.enableLogger(true, 'FontInstanceLibrary');
    logger.log('reducer loadFontInstanceById', { "family": fontInstanceId }, undefined, 'FontInstanceLibrary');
    return ({
      ...state,
      fontInstanceDataLoading: true,
      fontInstanceDataLoaded: false,
      fontInstanceDataError: false
    });
  }),

  on(fontInstanceLoaded, (state, { fontInstance }) => {
    const logger = new LoggerService;
    logger.enableLogger(true, 'FontInstanceLibrary');
    logger.log('reducer fontInstanceLoaded', fontInstance.family, undefined, 'FontInstanceLibrary');
    return ({
      ...state,
      loadedFontInstances: [...state.loadedFontInstances],
      fontInstanceDataLoading: false,
      fontInstanceDataLoaded: true,
      fontInstanceDataError: false
    });
  }),

  on(fontInstanceError, (state, { fontInstanceId }) => {
    const logger = new LoggerService;
    logger.enableLogger(true, 'FontInstanceLibrary');
    logger.log('reducer fontInstanceError', fontInstanceId, undefined, 'FontInstanceLibrary');
    return ({
      ...state,
      fontInstanceDataLoading: false,
      fontInstanceDataLoaded: false,
      fontInstanceDataError: true
    });
  }),
);
 
export function fontInstanceLibraryReducer(state: FontInstanceLibraryState, action: FontInstanceLibraryActions) {
  return _fontInstanceLibraryReducer(state, action);
}

function logger(id: string, output?: string) {
  const logger = new LoggerService;
  logger.enableLogger(true, 'FontInstanceLibrary');
  logger.log('reducer ' + id, output, undefined, 'FontInstanceLibrary');
}