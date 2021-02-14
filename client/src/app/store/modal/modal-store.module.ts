import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { modalFeatureKey } from '../modal/modal.state';
import { modalReducer } from '../modal/reducers/modal.reducer';


@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature(modalFeatureKey, modalReducer)
  ]
})
export class ModalStoreModule { }
