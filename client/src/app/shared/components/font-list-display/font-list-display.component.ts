import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { UiFont, FontListsEnum } from '../../../models/ui-font.model';
import { FontManagerService } from '../../../services/font-manager.service';
import { Observable, of, Subject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { LoggerService } from 'src/app/services/logger/logger.service';
import { FontInstance } from 'src/app/models/font-instance.model';
import { FontPreviewDisplayStylesEnum } from 'src/app/models/font-preview-pane.model';

export type DisplayType = 'family-only' | 'variant-details';

export interface FontClickedPayload {
  fontObj: UiFont;
  buttonId: string;
}

@Component({
  selector: 'app-font-list-display',
  templateUrl: './font-list-display.component.html',
  styleUrls: ['./font-list-display.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FontListDisplayComponent implements OnInit {
  public fontListEnum = FontListsEnum;
  public defaultFontInstance: Partial<FontInstance> = {
    weight: 'normal',
    italic: false,
    size: 18
  };
  
  @Input() displayType: DisplayType = 'variant-details';
  @Input() fontList$: Subject<UiFont[]>;
  @Input() listType: FontListsEnum;
  @Input() actionList: FontListsEnum;
  @Input() listName: string;
  @Input() showSearchControls: boolean = false;
  @Input() familyStringsFromSets$?: Observable<Set<string>> = null;

  @Input() numberOfPages: number; // to pass to paginator

  @Output() fontClicked = new EventEmitter<FontClickedPayload>();
  @Output() pageChanged = new EventEmitter<number>();
  @Output() searchString = new EventEmitter<string>();

  // enum template access
  public FontPreviewPaneDisplayStylesEnum = FontPreviewDisplayStylesEnum; 

  public currentPage: number = 1;

  constructor(private cdr: ChangeDetectorRef, private loggerService: LoggerService) {
    this.loggerService.enableLogger(true);
   }

  ngOnInit(): void {
  }

  public fontClick($event: FontClickedPayload): void {
    this.loggerService.log('fontClick: ' + $event.fontObj.uiText + ', button: ' + $event.buttonId);
    this.fontClicked.emit($event);
  }

  public getFontInstance(font: UiFont): FontInstance {
    const fontInstance: FontInstance = { ...this.defaultFontInstance, family: font.family } as FontInstance;
    return fontInstance;
  }

  public pageChange(pageNumber: number): void {
    this.pageChanged.emit(pageNumber);
    this.currentPage = pageNumber;
  }

  public searchChange(searchString: string): void {
    this.searchString.emit(searchString);
    this.pageChanged.emit(1); //TODO page change to 1 needs to filter down to pagination component
    this.currentPage = 1;
  }
  
  public fontInUse(font: UiFont): Observable<boolean> {
    if (!!this.familyStringsFromSets$) {
      const famMap = this.familyStringsFromSets$.pipe(map(families => {
        return families.has(font.family);
      }));
      return famMap;
    } else {
      return of(false);
    }
  }
}
