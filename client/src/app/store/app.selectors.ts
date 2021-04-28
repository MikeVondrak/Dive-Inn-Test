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
import { FontSetApi, FontSetApiMapped } from '../services/api/font-set/font-set.api.model';
import { getActiveFontInstanceApi } from './active-font-instance/selectors/active-font-instance.selectors';
import { getFontSetApis } from './font-set-library/selectors/font-set-library.selectors';
import { activeFontSetFontInstanceLoaded } from './active-font-set/actions/active-font-set.actions';
import { Observable } from 'rxjs';
import { UiFont } from '../models/ui-font.model';
import { FontListDisplayFont } from '../models/font-list-display.model';

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

export const getUiActiveFontInstance = createSelector(
  getActiveFontInstanceApi,
  getFontWeights,
  (activeFontInstanceApi: FontInstanceApi, fontWeightApis: FontWeightApi[]) => {
    const fontWeight: FontWeight = fontWeightApis.find(fwApi => fwApi.id === activeFontInstanceApi.fk_font_weight_id)?.weight as FontWeight;
    const uiActiveFontInstance: FontInstance = {
      family: activeFontInstanceApi.family,
      id: activeFontInstanceApi.id,
      italic: activeFontInstanceApi.italic,
      size: activeFontInstanceApi.size,
      weight: fontWeight,
    }
    return uiActiveFontInstance;
  }
);

export const getUiActiveFontSet: MemoizedSelector<AppState, FontSet> = createSelector(
  getFontInstances,
  getAllFontTypes,
  getActiveFontSet,
  getFontWeights,
  (fontInstanceApis: FontInstanceApi[], fontTypeApis: FontTypeApi[], activeFontSetApisMapped: FontSetApiMapped, fontWeights: FontWeightApi[]) => {
    
    let typeInstances: [FontType, FontInstance][] = [];

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
      const mapItem: [FontType, FontInstance] = [type, instance];
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

export const getFamiliesUsedInFontSets = createSelector(
  getFontSetApis,
  getFontInstances,
  (fontSets: FontSetApi[], fontInstances: FontInstanceApi[]) => {
    
    // example using forEach:

    // const familyList: Set<string> = new Set(); // use set to track unique list of font-family strings
    // fontSets.forEach(instance => {
    //     // get item from fontInstances that matches current row font instance id
    //     let family = fontInstances.find(inst => inst.id === instance.fk_font_instance_id)
    //     // add family string to Set
    //     familyList.add(family.family)
    // })

    // example using reduce: 
    return fontSets.reduce((acc, item) => {
      // get the FontInstanceApi that matches the ID of the FontSetApi (font set row)
      let fontInstance = fontInstances?.find(fi => fi.id === item.fk_font_instance_id);
      if (!!fontInstance) {
        const fontName = fontInstance.family;
        
        // add the fontName if it doesn't already exist in the results
        // if (!acc.includes(fontName)) {
        //   acc.push(fontName);
        // }
        acc.add(fontName);
      }
      
      // NOTE: hardcoding that Roboto cannot be removed so there is always a default font to show Preview Pane
      const defaultFontFamily = 'Roboto';
      acc.add(defaultFontFamily);

      return acc;
    }, new Set<string>());

  }
);

export const getSetsUsingFontFamily = createSelector(
  getFontSetApis,
  getFontInstances,
  (fontSets: FontSetApi[], fontInstances: FontInstanceApi[], props) => {
    let fonts = new Set<string>();
    const instance: FontInstanceApi = fontInstances?.find(fi => fi.family === props.family);
    if (instance) {
      // find any instances of props.family that exist in the fontsetapis
      // return an array of family strings
      fonts = fontSets.reduce((acc, item) => {
        if (item.fk_font_instance_id === instance.id) {
          acc.add(item.set_name);
        }
        return acc;
      }, new Set<string>());
    }
    if (props.family === 'Roboto') {
      fonts.add('!Default Font');
    }
    return fonts;
  }
);


export const getFontListDisplayFonts = createSelector(
  getFontSetApis,
  getFontInstances,
  (fontSets: FontSetApi[], fontInstances: FontInstanceApi[], props: { uiFonts: UiFont[] }) => {
    const fontListDisplayFonts: FontListDisplayFont[] = props.uiFonts.map(uiFont => {
      //debugger;
      // map -> for each font 
      //  get the instance ID by family from fontInstances
      const instance: FontInstanceApi = fontInstances?.find(fi => fi.family === uiFont.family);

      let setsUsingFont = [];

      if (!instance) {
        //debugger;
      }

      console.log('+++++++ sets using font');
      //  check if the instance ID exists in any of the font set rows
      setsUsingFont = 
        fontSets
          .filter(fontSet => {
            // debugger;
            console.log('++++++++++ ' + fontSet.fk_font_instance_id + ' : ' + instance?.id);
            return fontSet.fk_font_instance_id === instance?.id
          })
          .map(fontSet => fontSet.set_name);

      const fontListDisplayFont: FontListDisplayFont = {
        //...uiFont, // is this OK?
        family: uiFont.family,
        setsFontIsUsedIn: setsUsingFont
        //setsFontIsUsedIn: new Set<string>()
      }
      return fontListDisplayFont;
    })


    return fontListDisplayFonts;
  }
);