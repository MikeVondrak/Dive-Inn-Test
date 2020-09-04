import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavBarComponent } from './shared/components/nav-bar/nav-bar.component';

import { DemoPageComponent } from './pages/demo/demo.page.component';
import { ConfigurationPageComponent } from './pages/configuration/configuration.page.component';
import { SelectionPageComponent } from './pages/selection/selection.page.component';
import { NotFoundComponent } from './pages/error/not-found/not-found.component';
import { PageLoadingComponent } from './shared/components/page-loading/page-loading.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { FontListDisplayComponent } from './shared/components/font-list-display/font-list-display.component';
import { AnimatedCheckmarkSvgComponent } from './shared/components/animated-checkmark-svg/animated-checkmark-svg.component';
import { AnimatedCubeComponent } from './shared/components/animated-cube/animated-cube.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { FontDisplayTextboxComponent } from './shared/components/font-display-textbox/font-display-textbox.component';
import { FontInstancePickerComponent } from './shared/components/font-instance-picker/font-instance-picker.component';
import { DropdownComponent } from './shared/components/form-controls/dropdown/dropdown.component';
import { CheckboxComponent } from './shared/components/form-controls/checkbox/checkbox.component';
import { TextboxComponent } from './shared/components/form-controls/textbox/textbox.component';
import { ButtonComponent } from './shared/components/form-controls/button/button.component';
import { FontSetListComponent } from './shared/components/font-set-list/font-set-list.component';
import { FontSetSelectorComponent } from './pages/selection/components/font-set-selector/font-set-selector.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    DemoPageComponent,
    ConfigurationPageComponent,
    SelectionPageComponent,
    NotFoundComponent,
    PageLoadingComponent,
    HeaderComponent,
    FontListDisplayComponent,
    AnimatedCheckmarkSvgComponent,
    AnimatedCubeComponent,
    FooterComponent,
    FontDisplayTextboxComponent,
    FontInstancePickerComponent,
    DropdownComponent,
    CheckboxComponent,
    TextboxComponent,
    ButtonComponent,
    FontSetListComponent,
    FontSetSelectorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
