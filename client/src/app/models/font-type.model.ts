import { FontInstance } from './font-instance.model';

// TODO: any better solution for this? no way to handle types at runtime since the type system is removed when transpiled to js
// type names to match DB values, make sure we don't accidentally magic string
export type FontTypes = 'page_title' | 'main_nav' | 'section_title' | 'section_header' | 'section_text';

// TODO: build this dynamically from the DB
export const fontTypesMap = ['page_title', 'main_nav', 'section_title', 'section_header', 'section_text'];

/**
 * NgRx Entity identifying the area of the site a font will be used, e.g. for the "page_title" <h1>
 */
export interface FontType {
  id: number; // for NgRx entity
  type: FontTypes;
}

export type FontTypeInstanceKvp = { key: FontType, value: FontInstance }; // font type as string e.g. "Header Text" + FontInstance
export type FontTypeInstanceIdPair = { typeId: number, instanceId: number, entityId: number };

// define kvp to allow access as FontTypeInstance.FontTypes e.g. myFontInstance.page_title
export type FontTypeInstancePair = { key: FontTypes, value: FontInstance };

export type FontTypeInstancePair2 = {[key: string]: FontInstance};

//export type FontTypeInstanceMap = Map<FontTypes, FontInstance>;
export type FontTypeInstanceMap = Map<FontType, FontInstance>;
