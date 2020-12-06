import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { FontSet } from '../../../models/font-set.model';
import { fontInstancesError } from '../../font-instance-library/actions/font-instance-library.actions';
import { FontTypesEffects } from '../../font-type/effects';

export const fontSetFeatureKey = 'fontSets';
export const fontSetAdapter = createEntityAdapter<FontSet>();

export interface FontSetState extends EntityState<FontSet> {
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

/*
const fontSetProto = {
  Id: entityId,
  setId: dbSetId,
  name: setName,
  lastUpdated: dbDate,
	typeInstanceMap: [
		fontType: typeName
		id: instanceId
	]
}
/*

entities:
  fontTypes
  fontInstances
  fontWeights
  fontSets

fontSets
  

    id
    setId
    name

    fontTypeIds[]
    fontInstanceIds[]

    FontType -> FontInstance
    id, FontTypes -> id, family etc...

    fontTypeId -> fontInstanceId

*/