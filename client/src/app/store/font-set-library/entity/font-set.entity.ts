import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { FontSetApi } from 'src/app/services/api/font-set/font-set.api.model';
import { FontSet } from '../../../models/font-set.model';
import { fontInstancesError } from '../../font-instance-library/actions/font-instance-library.actions';
import { FontTypesEffects } from '../../font-type/effects';

export const fontSetFeatureKey = 'fontSets';
export const fontSetAdapter = createEntityAdapter<FontSetApi>();

export interface FontSetState extends EntityState<FontSetApi> {
  fontSetsLoading: boolean,
  fontSetsLoaded: boolean,
  fontSetsError: boolean
}

export const initialFontSetState: FontSetState = fontSetAdapter.getInitialState({
  fontSetsLoading: false,
  fontSetsLoaded: false,
  fontSetsError: false
});

// TODO: understand how to do this export as a named object?
export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = fontSetAdapter.getSelectors();
