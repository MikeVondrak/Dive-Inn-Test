import { selectFontTypeState } from './font-type.selectors';
import { fontTypeFeatureKey } from '../font-type.state';

describe('FontType Selectors', () => {
  it('should select the feature state', () => {
    const result = selectFontTypeState({
      [fontTypeFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
