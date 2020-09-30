import { FontWeight } from '../services/api/font/font.api.model';

export interface FontInstance {
    family: string;
    weight: FontWeight;
    italic: boolean;
    size: number;
}