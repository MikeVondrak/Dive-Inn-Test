import { createReducer, on } from '@ngrx/store';
import { FontSet } from 'src/app/models/font-set.model';
import { FontTypeInstanceKvp } from 'src/app/models/font-type.model';
import { LoggerService } from '../../../services/logger/logger.service';
import { 
  ActiveFontSetActions, 
  activeFontSetError, 
  activeFontSetLoaded, 
  setActiveFontSet,
  setActiveFontSetById,
  setActiveFontSetFontInstance,
  setDefaultActiveFontSet
} from '../actions/active-font-set.actions';
import { activeFontSetInitialState, ActiveFontSetState } from '../active-font-set.state';

const _activeFontSetReducer = createReducer(
  activeFontSetInitialState,
  on(setActiveFontSet, (state, { fontSet }) => { 

    // TODO: need this anymore?

    const newState: ActiveFontSetState = {
      ...state,
      ...fontSet,
      activeFontSetLoading: true,
      activeFontSetLoaded: false, // reset loaded and error state each time new active font set is loaded
      activeFontSetError: false,
    };
    debugger;
    return (newState);
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
    // get FontType array from DB
    // for each font type create a blank FontInstance


    // TODO
    // need to add id to API and FontInstance model
    // add getFontInstance(props to match) to API
    //  or reload all font instances from DB after each add

    return state;
  }),
  on(setActiveFontSetFontInstance, (state, { fontTypeInstanceKvp }) => {
    const newState = state.fontInstances.map(fi => {
      if (fi.key === fontTypeInstanceKvp.key) {
        // if the key matches an existing key map to the new KVP
        return fontTypeInstanceKvp;
      }
      return fi;
    });
    // add to ActiveFontSetState   FontInstances
    if (!newState.includes(fontTypeInstanceKvp)) {
      newState.push(fontTypeInstanceKvp);
    }
    const r = {
      ...state,
      fontInstances: newState
    };
    return (r);
  }),
  on(activeFontSetLoaded, (state) => {
    return({
      ...state,
      activeFontSetLoading: false,
      activeFontSetLoaded: true
    });
  }),
  on(activeFontSetError, (state) => {
    return({
      ...state,
      activeFontSetLoading: false,
      activeFontSetError: true,
    });
  }),
);
 
export function activeFontSetReducer(state: ActiveFontSetState, action: ActiveFontSetActions) {
  return _activeFontSetReducer(state, action);
}