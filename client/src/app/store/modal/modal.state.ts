export const modalFeatureKey = 'modal';

export interface ModalState {
  readonly isModalOpen: boolean
}

export const modalInitialState: ModalState = {
  isModalOpen: false
}
