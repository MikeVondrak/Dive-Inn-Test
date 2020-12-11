import { selectFontTypeState } from './font-type.selectors';
import { fontTypeFeatureKey } from '../entity/font-type.entity';

describe('FontType Selectors', () => {
  it('should select the feature state', () => {
    const result = selectFontTypeState({
      [fontTypeFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
