import { createReducer, on } from '@ngrx/store';
import { LoggerService } from '../../../services/logger/logger.service';
import { 
  ActiveFontSetActions, 
  setActiveFontSet,
  setDefaultActiveFontSet
} from '../actions/active-font-set.actions';
import { activeFontSetInitialState, ActiveFontSetState } from '../active-font-set.state';

const _activeFontSetReducer = createReducer(
  activeFontSetInitialState,
  on(setActiveFontSet, (state, { fontSet }) => { 
    const r = {
      ...state,
      ...fontSet,
    }
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
  })
);
 
export function activeFontSetReducer(state: ActiveFontSetState, action: ActiveFontSetActions) {
  return _activeFontSetReducer(state, action);
}