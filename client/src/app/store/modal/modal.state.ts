import { Component, Type } from "@angular/core";

export const modalFeatureKey = 'modal';

export interface ModalState {
  readonly isModalOpen: boolean,
  readonly isModalContentValid: boolean, // set by modal content component to indicate OK button press can proceed
}

export const modalInitialState: ModalState = {
  isModalOpen: false,
  isModalContentValid: false,
}
