import { FontWeight } from '../models/font-weight.model';

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
  size: 17,
  weight: 'normal'
}