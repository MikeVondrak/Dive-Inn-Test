import { modalFeatureKey, modalInitialState } from '../modal.state';
import { selectModalState } from '../selectors/modal.selectors';

describe('Modal Selectors', () => {
  it('should select the feature state', () => {
    const result = selectModalState({
      [modalFeatureKey]: {}
    });

    expect(result).toEqual(modalInitialState);
  });
});
