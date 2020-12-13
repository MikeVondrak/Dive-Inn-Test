import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { AppState } from '../../state';
import { FontSetState } from '../entity/font-set.entity';
import * as fontSetEntitySelectors from '../entity/font-set.entity';
import { FontSetApi } from 'src/app/services/api/font-set/font-set.api.model';
import { FontSet, FontSetListView } from 'src/app/models/font-set.model';

export const selectFeatureFontSets = createFeatureSelector<AppState, FontSetState>('fontSets');

export const getFontSetApis = createSelector(
  selectFeatureFontSets,
  fontSetEntitySelectors.selectAll
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