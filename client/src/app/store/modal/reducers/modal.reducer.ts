import { Action, createReducer, on } from '@ngrx/store';
import * as ModalActions from '../actions/modal.actions';
import { modalInitialState, ModalState } from '../modal.state';

const _modalReducer = createReducer(
  modalInitialState,

  on(ModalActions.openModal, (state, action) => {
    const newState: ModalState = {
      ...state,
      isModalOpen: true,
      title: action.title,
      contentType: action.contentType
    }
    return newState;
  }),

  on(ModalActions.closeModal, (state) => {
    const newState: ModalState = {
      ...state,
      isModalOpen: false,
    }
    return newState;
  }),
);

export function modalReducer(state: ModalState, action: ModalActions.ModalActions) {
  return _modalReducer(state, action);
}