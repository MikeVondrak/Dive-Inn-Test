import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FormControlsModule } from './form-controls/form-controls.module';

import { FontListDisplayComponent } from './font-list-display/font-list-display.component';
import { AnimatedCheckmarkSvgComponent } from './animated-checkmark-svg/animated-checkmark-svg.component';
import { AnimatedCubeComponent } from './animated-cube/animated-cube.component';
import { FooterComponent } from './footer/footer.component';
import { FontInstancePickerComponent } from './font-instance-picker/font-instance-picker.component';
import { FontPreviewPaneComponent } from './font-preview-pane/font-preview-pane.component';
import { PageLoadingComponent } from './page-loading/page-loading.component';
import { HeaderComponent } from './header/header.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LoadingIndicatorComponent } from './loading-indicator/loading-indicator.component';
import { ModalTemplateComponent } from './modal-template/modal-template.component';
import { ModalContainerComponent } from './modal-container/modal-container.component';

@NgModule({
  declarations: [
    PageLoadingComponent,
    HeaderComponent,
    FooterComponent,
    NavBarComponent,
    AnimatedCheckmarkSvgComponent,
    AnimatedCubeComponent,    
    FontInstancePickerComponent,
    FontListDisplayComponent,
    FontPreviewPaneComponent,
    LoadingIndicatorComponent,
    ModalTemplateComponent,
    ModalContainerComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormControlsModule,
  ],
  providers: [],
  exports: [
    FormControlsModule,
    PageLoadingComponent,
    HeaderComponent,
    FooterComponent,
    NavBarComponent,
    AnimatedCheckmarkSvgComponent,
    AnimatedCubeComponent,    
    FontInstancePickerComponent,
    FontListDisplayComponent,
    FontPreviewPaneComponent,
    LoadingIndicatorComponent,
    ModalTemplateComponent,
    ModalContainerComponent,
  ],
  entryComponents: [LoadingIndicatorComponent]
})
export class SharedComponentsModule { }
