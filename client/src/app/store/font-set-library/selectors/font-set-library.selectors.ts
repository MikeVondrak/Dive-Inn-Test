import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { AppState } from '../../state';
import { FontSetState } from '../entity/font-set.entity';
import * as fontSetEntitySelectors from '../entity/font-set.entity';
import { FontSetApi, FontSetApiMapped } from 'src/app/services/api/font-set/font-set.api.model';
import { FontSet, FontSetListView } from 'src/app/models/font-set.model';
import { FontTypeInstanceIdPair, FontTypeInstanceKvp } from 'src/app/models/font-type.model';
import { KeyValueNumber } from 'src/app/models/app.model';

export const selectFeatureFontSets = createFeatureSelector<AppState, FontSetState>('fontSets');

export const getFontSetApis = createSelector(
  selectFeatureFontSets,
  fontSetEntitySelectors.selectAll
);

/**
 * helper selector to convert rows of FontSetApi data to a single FontSetApiMapped object
 */
export const getFontSetApisMapped: MemoizedSelector<AppState, FontSetApiMapped[]> = createSelector(
  getFontSetApis,
  (state: FontSetApi[]) => {
    const mappedFontSetApis: FontSetApiMapped[] = state
      .reduce((accum, item) => {
        const existingSet = accum.find(accumItem => accumItem.set_id === item.set_id);
        const typeInstanceKvp: FontTypeInstanceIdPair = {
          typeId: item.fk_font_type_id,
          instanceId:  item.fk_font_instance_id,
          entityId: item.id,
        };
        if (!existingSet) {
          // create new FontSetApiMapped and push to accum
          const newFontSetApiMapped: FontSetApiMapped = {
            set_id: item.set_id,
            set_name: item.set_name,
            typeInstanceIdMap: [typeInstanceKvp]
          };
          accum.push(newFontSetApiMapped);
        } else {
          // add item fk_font_type_id and fk_font_instance_id as KeyValueNumber to typeInstanceIdMap array
          existingSet.typeInstanceIdMap.push(typeInstanceKvp);
        }
        return accum;
      },
      new Array<FontSetApiMapped>()
    );
    return mappedFontSetApis;
  }
);

/**
 * get a FontSetApiMapped object for the passed ID
 */
export const getFontSetById = createSelector(
  getFontSetApisMapped,
  (state: FontSetApiMapped[], props: { setId: number }) => {
    const fontSet: FontSetApiMapped = state?.find(fsApiMapped => fsApiMapped.set_id === props.setId);
    return fontSet;
  }
);

export const getFontSetsLoading = createSelector(
  selectFeatureFontSets,
  (state: FontSetState) => state?.fontSetsLoading
);
export const getFontSetsLoaded = createSelector(
  selectFeatureFontSets,
  (state: FontSetState) => state?.fontSetsLoaded
);
export const getFontSetsError = createSelector(
  selectFeatureFontSets,
  (state: FontSetState) => state?.fontSetsError
);

export const getFontSetsListView: MemoizedSelector<AppState, FontSetListView[]> = createSelector(
  getFontSetApis,
  (state: FontSetApi[]) => {

    // filter out duplicates from multiple "row" entries per set  
    const listViews: FontSetListView[] = state
      .reduce((accum, item) => {
        const exists = accum.find(accumItem => accumItem.setId === item.set_id);
        if (!exists) {
          const fslv: FontSetListView = {
            name: item.set_name,
            setId: item.set_id
          };
          accum.push(fslv);
        }
        return accum;
      },
      new Array<FontSetListView>()
    )
    return listViews;
  }
  
);