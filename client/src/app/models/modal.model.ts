import { Component, Type } from '@angular/core';
import { Action } from '@ngrx/store';

export interface ModalConfig {
  title: string,
  contentType: Type<Component>,
  primaryAction: Action,
  closeCallback?: () => void
}