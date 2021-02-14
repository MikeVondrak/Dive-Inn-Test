import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { modalFeatureKey } from '../modal/modal.state';
import { modalReducer } from '../modal/reducers/modal.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ModalEffects } from './effects/modal.effects'

const DEPENDENCIES = [EffectsModule.forFeature([ModalEffects])];
@NgModule({
  declarations: [],
  imports: [
    DEPENDENCIES,
    StoreModule.forFeature(modalFeatureKey, modalReducer)
  ]
})
export class ModalStoreModule { }
