import { FontWeight } from '../services/api/font/font.api.model';

export interface FontInstance {
  id: number;
  family: string;
  weight: FontWeight;
  italic: boolean;
  size: number;
}

export const defaultFontInstance: FontInstance = {
  id: -1,
  family: 'Roboto',
  italic: false,
  size: 16,
  weight: 'regular'
}