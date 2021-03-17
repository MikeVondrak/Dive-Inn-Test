import { Component, Type } from '@angular/core';
import { createAction, props, union } from '@ngrx/store';

export const openModal = createAction(
  '[Modal] Open Modal',
  props<{ title: string, contentType: Type<Component> }>()
);

export const closeModal = createAction(
  '[Modal] Close Modal'
);

export const setContentValid = createAction(
  '[Modal] Set Content Valid',
  props<{ valid: boolean }>()
)

const actions = union({
  openModal,
  closeModal,
  setContentValid,
})
export type ModalActions = typeof actions;



