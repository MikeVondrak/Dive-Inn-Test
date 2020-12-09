import { FontInstance } from './font-instance.model';

// type names to match DB values, temporary solution
export type FontTypes = 'page_title' | 'main_nav' | 'section_title' | 'section_header' | 'section_text';

/**
 * NgRx Entity identifying the area of the site a font will be used, e.g. for the "page_title" <h1>
 */
export interface FontType {
    id: number; // for NgRx entity
    type: FontTypes;
}


// remove this? combine w/FontTypeInstanceKvp
export type FontTypeIdKvp = [string, number];

export type FontTypeInstanceKvp = { key: FontType, value: FontInstance }; // font type as string e.g. "Header Text" + FontInstance
