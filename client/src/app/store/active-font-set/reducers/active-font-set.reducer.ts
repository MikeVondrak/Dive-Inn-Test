import { createReducer, on } from '@ngrx/store';
import { FontTypeInstanceKvp } from 'src/app/models/font-type.model';
import { LoggerService } from '../../../services/logger/logger.service';
import { 
  ActiveFontSetActions, 
  fontSetError, 
  fontSetLoaded, 
  setActiveFontSet,
  setActiveFontSetFontInstance,
  setDefaultActiveFontSet
} from '../actions/active-font-set.actions';
import { activeFontSetInitialState, ActiveFontSetState } from '../active-font-set.state';

const _activeFontSetReducer = createReducer(
  activeFontSetInitialState,
  on(setActiveFontSet, (state, { fontSet }) => { 
    const r = {
      ...state,
      ...fontSet,
      typeInstanceMap: new Map(fontSet.typeInstanceMap),
      //typeInstances: Array.from(fontSet.typeInstanceMap),
      fontInstances: [],
      fontSetLoading: true,
    };
    return (r);
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
  on(fontSetLoaded, (state) => {
    return({
      ...state,
      fontSetLoading: false,
      fontSetLoaded: true
    });
  }),
  on(fontSetError, (state) => {
    return({
      ...state,
      fontSetLoading: false,
      fontSetError: true,
    });
  }),
);
 
export function activeFontSetReducer(state: ActiveFontSetState, action: ActiveFontSetActions) {
  return _activeFontSetReducer(state, action);
}