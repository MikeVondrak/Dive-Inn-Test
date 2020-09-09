import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UiFont } from 'src/app/models/ui-font.model';
import { FontManagerService } from 'src/app/services/font-manager.service';
import { map } from 'rxjs/operators';
import { FontVariants } from 'src/app/services/api/font/font.api.model';
import { DropdownComponent } from '../form-controls/dropdown/dropdown.component';

@Component({
  selector: 'app-font-instance-picker',
  templateUrl: './font-instance-picker.component.html',
  styleUrls: ['./font-instance-picker.component.scss'],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class FontInstancePickerComponent implements OnInit {
  @ViewChild('selectableFonts') selectableFontsDropdown: DropdownComponent;
  @ViewChild('fontWeights') fontWeightsDropdown: DropdownComponent;

  public selectableFonts$: Observable<UiFont[]> = this.fontManagerService.selectableFonts$;
  public selectedFont: UiFont;

  public fontWeight$: Observable<FontVariants> = of(this.selectedFont?.properties?.variants);

  constructor(private fontManagerService: FontManagerService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  public selectedFontChange(font: UiFont) {
    this.selectedFont = font;
    this.fontWeight$ = of(this.selectedFont?.properties?.variants);
    //debugger;
    console.log("FONT INSTANCE PICKET: font family: " + font.family + ', weights: ' + this.fontWeight$);
    //this.cdr.detectChanges();
    this.fontWeightsDropdown.detectChanges();

  }

  cL() {
    console.log('selected: ' + this.selectedFont)
    console.log('fontweight: ' + this.fontWeight$)
  }

}
