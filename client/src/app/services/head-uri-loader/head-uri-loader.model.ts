// Hardcoded fonts to add to URI for <link> tag added to header to download Google Fonts
/** @TODO compile this programatically from the list of selectable + available fonts */

import { IUiFont, UiFont } from '../../models/ui-font.model';
import { FontWeight } from '../api/font/font.api.model';

/**
 * Include fonts here, will be downloaded via <link> element and added as an option in font dropdowns
 */
const uiFonts: IUiFont[] = [
  { family: 'Alfa Slab One' },
  { family: 'Anton' },
  { family: 'Bevan' },
  { family: 'Patua One' },
  { family: 'Piedra' },
  { family: 'PT Sans', hrefId: 'PT+Sans' },
  {
    family: 'PT Sans', hrefId: 'PT+Sans:wght@700', uiText: 'PT Sans Bold',
    properties: {
      variants: new Map<FontWeight, boolean>([['700', false]])
    }
  }
];

function generateFonts(fonts: IUiFont[]): UiFont[] {
  return fonts.map(font => new UiFont(font));
}

export const fonts: UiFont[] = generateFonts(uiFonts);

const _headerFonts: IUiFont[] = [
  { family: 'Alfa Slab One' },
  { family: 'Anton' },
  { family: 'Bevan' },
  { family: 'Patua One' },
  { family: 'Piedra' },
];
const _textFonts: IUiFont[] = [
  { family: 'PT Sans', hrefId: 'PT+Sans' },
  {
    family: 'PT Sans', hrefId: 'PT+Sans:wght@700', uiText: 'PT Sans Bold',
    properties: {
      variants: new Map<FontWeight, boolean>([['700', false]])
    }
  }
];
export const headerFonts = generateFonts(_headerFonts);
export const textFonts = generateFonts(_textFonts);
