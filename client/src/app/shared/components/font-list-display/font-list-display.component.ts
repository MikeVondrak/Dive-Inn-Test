import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { UiFont, FontListsEnum } from '../../../models/ui-font.model';
import { FontManagerService } from '../../../services/font-manager.service';
import { Observable, Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { LoggerService } from 'src/app/services/logger/logger.service';
import { FontInstance } from 'src/app/models/font-instance.model';

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
    weight: 'regular',
    italic: false,
    size: 18
  };
  
  @Input() displayType: DisplayType = 'variant-details';
  @Input() fontList$: Subject<UiFont[]>;
  @Input() listType: FontListsEnum;
  @Input() actionList: FontListsEnum;
  @Input() listName: string;
  @Input() numberOfPages: number; // to pass to paginator

  @Output() fontClicked = new EventEmitter<FontClickedPayload>();
  @Output() pageChanged = new EventEmitter<number>();

  constructor(private cdr: ChangeDetectorRef, private loggerService: LoggerService) {
    this.loggerService.enableLogger(true);
   }

  ngOnInit(): void {
  }

  public fontClick($event: FontClickedPayload) {
    this.loggerService.log('fontClick: ' + $event.fontObj.uiText + ', button: ' + $event.buttonId);
    this.fontClicked.emit($event);
  }

  public getFontInstance(font: UiFont): FontInstance {
    const fontInstance: FontInstance = { ...this.defaultFontInstance, family: font.family } as FontInstance;
    return fontInstance;
  }

  public pageChange(pageNumber: number) {
    debugger;
    this.pageChanged.emit(pageNumber);
  }
}
