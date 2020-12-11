import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from './state';

import { FontInstanceState } from './font-instance-library/entity/font-instance.entity';
import { FontInstanceApi } from '../services/api/font-instance/font-instance.api.model';
import { FontInstance } from '../models/font-instance.model';

import { FontWeightState } from './font-weight/entity/font-weight.entity';
import { FontWeightApi } from '../services/api/font-weight/font-weight.api.model';
import { FontWeight } from '../services/api/font/font.api.model'; // TODO: move to its own file for consistency?

import { getAllFontInstanceApis } from './font-instance-library/selectors/font-instance-library.selectors';
import { getAllFontWeights } from './font-weight/selectors/font-weight.selectors';

export const getAllFontInstances = createSelector(
  getAllFontInstanceApis,
  getAllFontWeights,
  (fontInstanceApis: FontInstanceApi[], fontWeightApis: FontWeightApi[]) => {
    
    const fontInstances: FontInstance[] = fontInstanceApis
      .map(fiApi => {
        const fontWeight: FontWeight = fontWeightApis.find(fwApi => fwApi.id === fiApi.fontWeightId)
        const fi: FontInstance = {
        id: fiApi.id,
        family: fiApi.family,
        weight: fontWeight,
        italic: fiApi.italic,
        size: fiApi.size,
      }
    );
    return fontInstances;
  }
)