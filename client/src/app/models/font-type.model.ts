import { FontInstance } from './font-instance.model';

// type names to match DB values, temporary solution
export type FontTypes = 'page_title' | 'main_nav' | 'section_title' | 'section_header' | 'section_text';

export interface FontType {
    id: number;
    type: FontTypes;
}

export type FontTypeIdKvp = [string, number];

export type FontTypeInstanceKvp = {key: FontType, value: FontInstance}; // font type as string e.g. "Header Text" + FontInstance
