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
import { initialFontInstanceState, FontInstanceState, fontInstanceAdapter } from '../entity/font-instance.entity';
 
const _fontInstanceLibraryReducer = createReducer(
  initialFontInstanceState,
  
  on(loadFontInstances, (state) => {
    logger('loadFontInstances');
    return ({
      ...state,
      fontInstanceLoading: true,
    });
  }),
  on(fontInstancesLoaded, (state, { allFontInstances }) => {
    logger('fontInstancesLoaded');
    const newState = {
      ...state,
      fontInstanceLoading: false,
      fontInstanceLoaded: true,
    };
    return fontInstanceAdapter.setAll(allFontInstances, newState);
  }),
  on(fontInstancesError, (state) => {
    logger('fontInstancesError');
    return ({
      ...state,
      fontInstanceLoading: false,
      fontInstanceError: true,
    });
  }),
  
  // on(loadFontInstanceById, (state, { fontInstanceId }) => {
  //   logger('loadFontInstanceById', "family: " + fontInstanceId);
  //   return ({
  //     ...state,
  //     fontInstanceDataLoading: true,
  //     fontInstanceDataLoaded: false,
  //     fontInstanceDataError: false
  //   });
  // }),

  // on(fontInstanceLoaded, (state, { fontInstance }) => {
  //   logger('fontInstanceLoaded', fontInstance.family);
  //   const newState = {
  //     ...state,
  //     fontInstanceDataLoading: false,
  //     fontInstanceDataLoaded: true,
  //     fontInstanceDataError: false
  //   };
  //   return fontInstanceAdapter.addOne(fontInstance, newState);
  // }),

  // on(fontInstanceError, (state, { fontInstanceId }) => {
  //   logger('fontInstanceError', fontInstanceId.toString());
  //   return ({
  //     ...state,
  //     fontInstanceDataLoading: false,
  //     fontInstanceDataLoaded: false,
  //     fontInstanceDataError: true
  //   });
  // }),
);
 
export function fontInstanceLibraryReducer(state: FontInstanceState, action: FontInstanceLibraryActions) {
  return _fontInstanceLibraryReducer(state, action);
}

function logger(id: string, output?: string) {
  const logger = new LoggerService;
  logger.enableLogger(true, 'FontInstanceLibrary');
  logger.log('reducer ' + id, output, undefined, 'FontInstanceLibrary');
}