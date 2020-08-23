import { FontVariants, FontWeight } from '../services/api/font/font.api.model';

export enum FontListsEnum {
  SELECTABLE = "SELECTABLE",
  BLACKLISTED = "BLACKLISTED",
  AVAILABLE = "AVAILABLE"
}

export interface FontProperties {
  // sizeRem?: number;
  // letterSpacingPx?: number;
  id?: number;
  category?: string;
  variants?: FontVariants;

  listId?: FontListsEnum; // id of list that font exists in
}

export interface IUiFont {
  uiText?: string;
  family: string;
  hrefId?: string;
  properties?: FontProperties;
}

export class UiFont implements IUiFont {
  readonly uiText: string;
  readonly family: string;
  readonly hrefId: string;
  readonly properties: FontProperties;

  constructor(font: IUiFont) {
    if (!font.family) {
      throw new Error('font.family must exist and not be an empty string in constructor argument for UiFont');
    }
    this.family = font.family;
    this.uiText = font.uiText ? font.uiText : font.family;
    this.hrefId = font.hrefId ? font.hrefId : font.family.split(' ').join('+');
    this.properties = font.properties ? Object.assign({}, font.properties) : {};
  }

  /**
   * Recursively check that objects are deeply equal
   * @param right object to test equality
   */
  public equals(right: UiFont): boolean {
    return this.compareObjProps(this, right);
  }
  /**
   * Recursively check that objects have the same propertier and values
   * @param obj1 left side of equality
   * @param obj2 right side of equality
   */
  private compareObjProps(obj1: any, obj2: any) {
    for (const objProp in obj1) {
      if (!obj2.hasOwnProperty(objProp)) {
        return false;
      } else if (typeof obj1[objProp] === 'object') {
        if (!this.compareObjProps(obj1[objProp], obj2[objProp])) {
          return false;
        }
      } else if (obj1[objProp] !== obj2[objProp]) {
        return false;
      }
    }
    return true;
  }

  /**
   * Determine if the passed in font variant is contained within this font
   * - Test if a specfic font variant (from the db) exists in the Google Font set of variants
   * @param containee font variant to check for being contained within this font
   */
  public contains(containee: UiFont): boolean {
    return this.containsObjProps(this, containee);
  }
  /**
   * Recursively examine UiFont object to check that properties and values of containee exist in container
   * @param container font with set of varients to check for containee
   * @param containee font variant to check for in container
   */
  private containsObjProps(container: any, containee: any) {
    for (const objProp in containee) {
      // contaier must have all properties of containee
      if (!container.hasOwnProperty(objProp)) {
        return false;
      // if property is an object check all properties in it recursively
      } else if (typeof containee[objProp] === 'object') {
        if (objProp === 'variants') {
          const containerVariants = container[objProp];
          const containeeVariants = containee[objProp];
          const containeeVariantsKeys = containeeVariants.keys();
          // Google font must have variant defined by DB font to be valid
          let containeeVariantKey = containeeVariantsKeys.next();
          // for each value of the variants map of containee, check that container has the same key
          while (containeeVariantKey.value && !containeeVariantsKeys.done) {
            if (!containerVariants.has(containeeVariantKey.value)) {
              return false;
            }
            containeeVariantKey = containeeVariantsKeys.next();
          }
        }
        else if (!this.containsObjProps(container[objProp], containee[objProp])) {
          return false;
        }
      // omit checking specific properties for 'contains' equivalence
      } else {
        switch (objProp) {
          case 'uiText': /* uiText from db won't necessarily match Google Font */ break;
          case 'id': /* only used for db, doesn't need to match */ break;
          case 'category': /* only used for db, doesn't need to match */ break;
          case 'hrefId': /* hrefId can be different on db */ break;
          default:
            if (container[objProp] !== containee[objProp]) {
              return false;
            }
        }
      }
    }
    return true;
  }
}
