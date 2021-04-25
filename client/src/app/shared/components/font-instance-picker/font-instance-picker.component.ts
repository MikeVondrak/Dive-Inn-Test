import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef, ViewChild, EventEmitter, Output, Input, SimpleChanges, OnChanges, AfterViewInit } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { IUiFont, UiFont } from 'src/app/models/ui-font.model';
import { FontManagerService } from 'src/app/services/font-manager.service';
import { filter, map, take, tap } from 'rxjs/operators';
import { FontVariants } from 'src/app/services/api/font/font.api.model';
import { DropdownCompare, DropdownComponent, DropdownItem, SelectOption } from '../form-controls/dropdown/dropdown.component';
import { CheckboxComponent } from '../form-controls/checkbox/checkbox.component';
import { FontInstance, defaultFontInstance } from '../../../models/font-instance.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/state';
import { BaseComponent } from '../abstract/base/base.component';
import { FontWeight } from 'src/app/models/font-weight.model';
import { setDefaultActiveFontInstance } from 'src/app/store/active-font-instance/actions/active-font-instance.actions';

type FontWeightDropdownSelection = { key: string, value: boolean };

@Component({
  selector: 'app-font-instance-picker',
  templateUrl: './font-instance-picker.component.html',
  styleUrls: ['./font-instance-picker.component.scss'],
})
export class FontInstancePickerComponent extends BaseComponent implements AfterViewInit, OnInit, OnChanges {

  @Output() fontInstanceChange: EventEmitter<FontInstance> = new EventEmitter<FontInstance>();

  @Input() fontInstance: FontInstance = { ...defaultFontInstance };

  @ViewChild('selectableFonts', { static: false }) selectableFonts: DropdownComponent;
  @ViewChild('fontWeights', { static: false }) fontWeights: DropdownComponent;
  @ViewChild('italicCheckbox', { static: false }) italicCheckbox: CheckboxComponent;

  public selectableFonts$: Observable<UiFont[]> = this.fontManagerService.selectableFonts$;
  public selectedFont: UiFont;
  public italicable: boolean = false;
  
  public fontWeights$: Observable<FontVariants>;
  public fontWeightOptions$: Observable<FontWeight[]>;
  public selectedWeight$: Subject<SelectOption> = new Subject<SelectOption>();
  public compareFontWeights: DropdownCompare;
  

  constructor(private fontManagerService: FontManagerService, private cdr: ChangeDetectorRef, private store$: Store<AppState>) {
    super();
    this.fontWeights$ = of(this.selectedFont?.properties?.variants);
  }

  ngOnInit(): void {
    // enable/disable italic checkbox if font supports
    this.isItalicable('normal').subscribe(italicable => this.italicable = italicable);

    this.loggerService.enableLogger(true);
  }

  ngAfterViewInit() {

    // TODO: figure out why we need to dispatch this here
    // - something in the chain of store events when the app loads doesn't occur when the page is not the Select page
    // - dropdowns are not initialized unless we explicitly call setDefaultActiveFontInstance() again here
    this.store$.dispatch(setDefaultActiveFontInstance());
  }

  ngOnChanges(changes: SimpleChanges): void {
    // check if the fontInstance input changed
    const keyNames = Object.keys(changes);
    if (keyNames.includes('fontInstance')) {
      if (!!this.fontInstance.family) {
        this.selectableFonts$.pipe(filter(fonts => !!fonts && fonts.length > 0), take(1)).subscribe(fonts => {
          const uiFont = fonts.find(font => font.family === this.fontInstance.family);
          if (uiFont && (!this.selectedFont || !uiFont.equals(this.selectedFont))) {
            // check if the Font dropdown exists in the template and then set the selection
            if (!!this.selectableFonts) {
              // download the font with all available weights to display in the preview pane
              // NOTE: this adds an additional script tag and API call that could be refactored out
              this.selectableFonts.setSelected(uiFont);
            }
          }
          let weight = changes.fontInstance.currentValue.weight;
          // check if the option selected in the dropdown already matches the fontInstance weight
          if (weight && this.fontWeights && this.fontWeights.selectedOption !== weight) {
            // check if the fontInstance weight doesn't exist as an option in the dropdown
            // if so set to 'normal' or to nearest value, which?
            //this.fontInstance.weight = 'normal';

            // wait until font has updated to change weight dropdown
            setTimeout(() => {
              this.fontWeights.setSelected(weight);
            });
          }
        });
      }
    }
  }

  public selectedFontChange(font: UiFont) {
    this.loggerService.log('selectedFontChange', font);

    this.selectedFont = font;
    this.fontWeights$ = of(this.selectedFont?.properties?.variants);
    this.fontWeightOptions$ = this.fontWeights$.pipe(
      map(weightMap => {
        return Array.from(weightMap).map(mapPair => mapPair[0])
      })
    );
    this.fontWeightOptions$.subscribe(options => {
      if(!options.includes(this.fontInstance.weight)) {
        this.fontInstance.weight = 'normal';
        this.emitChange();
      }
    });
    this.fontInstance.family = font.family;

    this.isItalicable('normal').subscribe(italicable => {
      this.italicable = italicable;
      // reset italic checkbox on font change in case the newly selected font doesn't support italic
      this.fontInstance.italic = this.italicable ? this.fontInstance.italic : false;
      this.emitChange();
    }); 
  }

  public selectedWeightChange(selection: DropdownItem) {
    const weight = selection as FontWeight;
    this.fontInstance.weight = weight;
    this.isItalicable(weight).subscribe(italicable => this.italicable = italicable);
    this.emitChange();
  }

  public italicChange(checked: boolean) {
    this.fontInstance.italic = checked;
    this.emitChange();
  }

  public sizeChange(size: string) {
    console.log('###### fontInstancePicker sizeChange: ' + size);
    let parsed = parseInt(size);
    if (!isNaN(parsed)) {
      this.fontInstance.size = parsed;
    }
    this.emitChange();
  }
  /**
   * Create a new object to assign to fontInstance so the change to the input will be picked up by change detection
   */
  private setNewFontState() {
    const newFontInstance: FontInstance = {
      ...this.fontInstance,
    };
    this.fontInstance = newFontInstance;
  }

  public emitChange() {
    this.setNewFontState();
    this.fontInstanceChange.emit(this.fontInstance);
  }

  private isItalicable(weight: FontWeight): Observable<boolean> {
    return this.fontWeights$.pipe(
      map(weightMap => weightMap ? weightMap.get(weight) : false));
  }

  public upClick() {
    this.fontInstance.size++;
    this.emitChange();
  }

  public downClick() {
    this.fontInstance.size--;
    this.emitChange();
  }
}
