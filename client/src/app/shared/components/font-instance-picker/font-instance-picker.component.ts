import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef, ViewChild, EventEmitter, Output, Input } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { UiFont } from 'src/app/models/ui-font.model';
import { FontManagerService } from 'src/app/services/font-manager.service';
import { map } from 'rxjs/operators';
import { FontVariants, FontWeight } from 'src/app/services/api/font/font.api.model';
import { DropdownComponent, DropdownItem, SelectOption } from '../form-controls/dropdown/dropdown.component';
import { CheckboxComponent } from '../form-controls/checkbox/checkbox.component';
import { FontInstance } from '../../../models/font-instance.model';

type FontWeightDropdownSelection = { key: string, value: boolean };

@Component({
  selector: 'app-font-instance-picker',
  templateUrl: './font-instance-picker.component.html',
  styleUrls: ['./font-instance-picker.component.scss'],
})
export class FontInstancePickerComponent implements OnInit {

  private readonly defaultFontInstance: FontInstance = {
    family: '',
    italic: false,
    size: 36,
    weight: '100'
  }

  @Output() fontInstanceChange: EventEmitter<FontInstance> = new EventEmitter<FontInstance>();

  @Input() fontInstance: FontInstance = this.defaultFontInstance;

  @ViewChild('selectableFonts', { static: false }) selectableFonts: DropdownComponent;
  @ViewChild('fontWeights', { static: false }) fontWeights: DropdownComponent;
  @ViewChild('italicCheckbox', { static: false }) italicCheckbox: CheckboxComponent;

  public selectableFonts$: Observable<UiFont[]> = this.fontManagerService.selectableFonts$;
  public selectedFont: UiFont;
  public italicable: boolean = false;


  public fontWeights$: Observable<FontVariants> = of(this.selectedFont?.properties?.variants);
  public selectedWeight$: Subject<SelectOption> = new Subject<SelectOption>();
  
  public selectedFont$: Subject<SelectOption> = new Subject<SelectOption>();

  constructor(private fontManagerService: FontManagerService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  public selectedFontChange(font: UiFont) {
    this.selectedFont = font;
    this.fontWeights$ = of(this.selectedFont?.properties?.variants);
    
    // reset italic checkbox on font change in case the newly selected font doesn't support italic
    this.italicCheckbox.checkedValue = false;

    this.fontInstance.family = font.family;
    this.emitChange();

    this.fontWeights.setSelected({key:'regular', value:false});
  }

  public selectedWeightChange(selection: DropdownItem) {  
    const kvp = selection as FontWeightDropdownSelection;
    this.fontInstance.weight = kvp.key as FontWeight;

    // enable/disable italic checkbox if font supports
    this.italicable = kvp.value;
    this.emitChange();
  }

  public italicChange(checked: boolean) {
    this.fontInstance.italic = checked;
    this.emitChange();
  }

  public sizeChange(size: number) {
    this.fontInstance.size = size;
    this.emitChange();
  }

  public emitChange() {
    this.fontInstanceChange.emit(this.fontInstance);
  }
}
