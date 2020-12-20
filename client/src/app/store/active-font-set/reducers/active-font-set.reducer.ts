import { createReducer, on } from '@ngrx/store';
import { FontSet } from 'src/app/models/font-set.model';
import { FontTypeInstanceIdPair, FontTypeInstanceKvp, fontTypesMap } from 'src/app/models/font-type.model';
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
  on(setActiveFontSetFontInstance, (state, { fontTypeInstancePair }) => {
    debugger; // 

    // get the type id from type
    const typeId = fontTypesMap.indexOf(fontTypeInstancePair.key) + 1;

    const ftipFromKvp: FontTypeInstanceIdPair = {
      typeId: typeId,
      instanceId: fontTypeInstancePair.value.id
    }

    const newTypeInstanceIds = state.fontTypeInstanceIds.map(fti => {
      // determine which type-instance needs to be updated by checking the type ID
      if (fti.typeId === typeId) {
        return ftipFromKvp;
      }
      return fti;
    });

    // when we're initially building the array the type won't exist until we push the first time
    if (!newTypeInstanceIds.includes(ftipFromKvp)) {
      newTypeInstanceIds.push(ftipFromKvp);
    }
    const r: ActiveFontSetState = {
      ...state,
      fontTypeInstanceIds: newTypeInstanceIds
    };
    return (r);
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
);
 
export function activeFontSetReducer(state: ActiveFontSetState, action: ActiveFontSetActions) {
  return _activeFontSetReducer(state, action);
}