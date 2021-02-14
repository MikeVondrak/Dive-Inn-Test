import { createAction, props, union } from '@ngrx/store';

export const openModal = createAction(
  '[Modal] Open Modal'
);

export const closeModal = createAction(
  '[Modal] Close Modal'
);

const actions = union({
  openModal,
  closeModal,
})
export type ModalActions = typeof actions;



