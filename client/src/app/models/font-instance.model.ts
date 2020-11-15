import { FontWeight } from '../services/api/font/font.api.model';

export interface FontInstance {
    id: number,
    family: string;
    weight: FontWeight;
    italic: boolean;
    size: number;
}