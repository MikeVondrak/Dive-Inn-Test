import { createReducer, on } from '@ngrx/store';
import { FontSet } from 'src/app/models/font-set.model';
import { FontTypeInstanceIdPair, FontTypeInstanceKvp, fontTypesMap } from 'src/app/models/font-type.model';
import { LoggerService } from '../../../services/logger/logger.service';
import { 
  ActiveFontSetActions, 
  activeFontSetError, 
  activeFontSetLoaded, 
  saveActiveFontSet,
  setActiveFontSetById,
  setActiveFontSetFontInstance,
  setDefaultActiveFontSet,
  activeFontSetFontInstanceLoaded,
  setActiveFontSetSavedFlag
} from '../actions/active-font-set.actions';
import { activeFontSetInitialState, ActiveFontSetState } from '../active-font-set.state';

const _activeFontSetReducer = createReducer(
  activeFontSetInitialState,
  on(saveActiveFontSet, (state) => {
    // TODO: could add saving / error state for DB transaction here 
    return (state);
  }),  
  on(setActiveFontSetSavedFlag, (state, { savedFlag }) => {
    console.log('setActiveFontSetSavedFlag reducer: ' + savedFlag);
    const newState: ActiveFontSetState = {
      ...state,
      saved: savedFlag
    }
    return newState
  }),
  on(setActiveFontSetById, (state, { fontSetId }) => {
    const newState: ActiveFontSetState = {
      ...state,
      activeFontSetLoading: true,
      activeFontSetLoaded: false, // reset loaded and error state each time new active font set is loaded
      activeFontSetError: false,
    }
    return newState;
  }),
  on(setDefaultActiveFontSet, (state) => {
    // nothing in here yet, see effect
    return state;
  }),
  on(setActiveFontSetFontInstance, (state, { fontType }) => {
    const newState: ActiveFontSetState = {
      ...state,
      saved: false,
      activeFontSetInstanceLoading: true,
      activeFontSetInstanceLoaded: false, // reset loaded and error state each time new active font set is loaded
      activeFontSetInstanceError: false,
    }
    return newState;
  }),

  on(activeFontSetLoaded, (state, action) => {
    const fontSet = action.fontSet;    
    const newState = {
      ...state,
      setId: fontSet.set_id,
      name: fontSet.set_name,
      fontTypeInstanceIds: Array.from(fontSet.typeInstanceIdMap),
      activeFontSetLoading: false,
      activeFontSetLoaded: true
    }
    return newState;
  }),
  on(activeFontSetError, (state) => {
    return({
      ...state,
      activeFontSetLoading: false,
      activeFontSetError: true,
    });
  }),
  on(activeFontSetFontInstanceLoaded, (state, action) => {
    let newFontTypeInstanceIds = state.fontTypeInstanceIds.map(idPair => {
      const newPair = { ...idPair };      
      if (action.fontTypeId === idPair.typeId) {
        newPair.instanceId = action.fontInstanceApi.id;
      }
      return newPair;
    });
    const newState: ActiveFontSetState = {
      ...state,
      fontTypeInstanceIds: newFontTypeInstanceIds
    }
    return newState
  }),
);
 
export function activeFontSetReducer(state: ActiveFontSetState, action: ActiveFontSetActions) {
  return _activeFontSetReducer(state, action);
}