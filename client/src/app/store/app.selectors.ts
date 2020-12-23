import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { AppState } from './state';

import { FontInstanceState } from './font-instance-library/entity/font-instance.entity';
import { FontInstanceApi } from '../services/api/font-instance/font-instance.api.model';
import { FontInstance } from '../models/font-instance.model';

import { FontWeightState } from './font-weight/entity/font-weight.entity';
import { FontWeightApi } from '../services/api/font-weight/font-weight.api.model';
import { FontWeight } from '../models/font-weight.model'; // TODO: move to its own file for consistency?

import { getFontInstances } from './font-instance-library/selectors/font-instance-library.selectors';
import { getFontWeights } from './font-weight/selectors/font-weight.selectors';
import { getAllFontTypes } from './font-type/selectors/font-type.selectors';
import { FontTypeApi } from '../services/api/font-type/font-type.api.model';
import { getActiveFontSet, getActiveFontSetTypeInstanceIds } from './active-font-set/selectors/active-font-set.selectors';
import { FontSet } from '../models/font-set.model';
import { FontType, FontTypeInstanceIdPair, FontTypeInstanceMap, FontTypes } from '../models/font-type.model';
import { FontSetApiMapped } from '../services/api/font-set/font-set.api.model';

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

export const getUiActiveFontSet: MemoizedSelector<AppState, FontSet> = createSelector(
  getFontInstances,
  getAllFontTypes,
  getActiveFontSet,
  getFontWeights,
  (fontInstanceApis: FontInstanceApi[], fontTypeApis: FontTypeApi[], activeFontSetApisMapped: FontSetApiMapped, fontWeights: FontWeightApi[]) => {
    
    let typeInstances: [FontTypes, FontInstance][] = [];

    activeFontSetApisMapped.typeInstanceIdMap
    .forEach(activeFontSetTypeInstance => {

      const typeApi = fontTypeApis.find(f => f.id === activeFontSetTypeInstance.typeId); 
      const instanceApi = fontInstanceApis.find(f => f.id === activeFontSetTypeInstance.instanceId);

      const type: FontType = {
        id: typeApi?.id,
        type: typeApi?.type as FontTypes
      };
      const weightApi = fontWeights.find(weight => weight.id === instanceApi?.fk_font_weight_id);
      const instance: FontInstance = {
        id: instanceApi?.id,
        family: instanceApi?.family,
        italic: instanceApi?.italic,
        size: instanceApi?.size,
        weight: weightApi?.weight as FontWeight
      }
      const mapItem: [FontTypes, FontInstance] = [type.type as FontTypes, instance];
      typeInstances.push(mapItem);
    });

    const typeInstanceMap: FontTypeInstanceMap = new Map(typeInstances);

    const fontSet: FontSet = {
      setId: activeFontSetApisMapped.set_id,
      name: activeFontSetApisMapped.set_name,
      typeInstanceMap: typeInstanceMap
    };

    return fontSet;
  }
);

export const getUiActiveFontSetTypeInstances: MemoizedSelector<AppState, FontTypeInstanceMap> = createSelector(
  getUiActiveFontSet,
  (fontSet: FontSet) => {
    return fontSet.typeInstanceMap
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