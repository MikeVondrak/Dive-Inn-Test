import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ModalState, modalFeatureKey } from '../modal.state';

export const selectModalState = createFeatureSelector<ModalState>(
  modalFeatureKey
);

export const isModalOpen = createSelector(
  selectModalState,
  (state: ModalState) => state.isModalOpen
);

export const isModalContentValid = createSelector(
  selectModalState,
  (state: ModalState) => state.isModalContentValid
);
