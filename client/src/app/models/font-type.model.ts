import { FontInstance } from './font-instance.model';

export interface FontType {
    id: number;
    type: string;
}

export type FontTypeIdKvp = [string, number];

export type FontTypeInstanceKvp = [string, FontInstance]; // font type as string e.g. "Header Text" + FontInstance