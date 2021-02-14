import { Component, Type } from "@angular/core";

export const modalFeatureKey = 'modal';

export interface ModalState {
  readonly isModalOpen: boolean,
  readonly title: string,
  readonly content: Component,
  readonly contentType: Type<Component>,
}

export const modalInitialState: ModalState = {
  isModalOpen: false,
  title: '',
  content: null,
  contentType: null
}
