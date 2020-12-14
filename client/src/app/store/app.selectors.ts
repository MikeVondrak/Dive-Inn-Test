import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from './state';

import { FontInstanceState } from './font-instance-library/entity/font-instance.entity';
import { FontInstanceApi } from '../services/api/font-instance/font-instance.api.model';
import { FontInstance } from '../models/font-instance.model';

import { FontWeightState } from './font-weight/entity/font-weight.entity';
import { FontWeightApi } from '../services/api/font-weight/font-weight.api.model';
import { FontWeight } from '../models/font-weight.model'; // TODO: move to its own file for consistency?

import { getFontInstances } from './font-instance-library/selectors/font-instance-library.selectors';
import { getFontWeights } from './font-weight/selectors/font-weight.selectors';

export const getUiFontInstances = createSelector(
  getFontInstances,
  getFontWeights,
  (fontInstanceApis: FontInstanceApi[], fontWeightApis: FontWeightApi[]) => {
    
    const fontInstances: FontInstance[] = fontInstanceApis
      .map(fiApi => {

        const fontWeight: FontWeight = fontWeightApis.find(fwApi => fwApi.id === fiApi.fk_font_weight_id)?.weight as FontWeight;
        const fi: FontInstance = {
          id: fiApi.id,
          family: fiApi.family,
          weight: fontWeight,
          italic: fiApi.italic,
          size: fiApi.size,
        }
        return fi;
      }
    );
    return fontInstances;
  }
);

// export const getUiActiveFontSet = createSelector(
//   selectFeatureActiveFontSet,
//   (state: ActiveFontSetState) => {
//     const tiMap = state.fontTypeInstanceIds.map(ti => {
//       return [ti[0], ti[1]];
//     });
//     const fontSet: FontSet = {
//       setId: state.setId,
//       name: state.name,
//       lastUpdated: state.lastUpdated,
//       typeInstanceMap : new Map(state.fontTypeInstanceIds) // !!!!!!!!!!!!!!!!!!!!!!!!!!!!
//     }
//     return fontSet;
//   }
// );