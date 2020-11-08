import { createReducer, on } from '@ngrx/store';
import { LoggerService } from '../../../services/logger/logger.service';
import { 
  ActiveFontSetActions, 
  setActiveFontSet
} from '../actions/active-font-set.actions';
import { activeFontSetInitialState, ActiveFontSetState } from '../active-font-set.state';
 
const _activeFontSetReducer = createReducer(
  activeFontSetInitialState,
  on(setActiveFontSet, (state, { fontSet }) => 
  { 
    debugger;
    return ({
      ...state,
      //...fontSet
    });
  })
);
 
export function activeFontSetReducer(state: ActiveFontSetState, action: ActiveFontSetActions) {
  return _activeFontSetReducer(state, action);
}