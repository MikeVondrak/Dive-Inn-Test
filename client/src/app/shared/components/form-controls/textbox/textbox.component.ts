import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';

export type TextboxDataType = 'string' | 'integer' | 'float';

@Component({
  selector: 'app-textbox',
  templateUrl: './textbox.component.html',
  styleUrls: ['./textbox.component.scss']
})
export class TextboxComponent<TextboxType> implements OnInit {

  @Input() dataType: TextboxDataType;
  @Input() htmlId: string = '';
  @Input() title: string = '';
  @Input() value: string = '';

  @Output() textChange: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('validationError', { static: false }) validationError: ElementRef;
  
  constructor(private renderer: Renderer2, private el: ElementRef) { }

  ngOnInit(): void {
  }

  public onNgModelChange($event: Event) {
    this.textChange.emit(this.value);

    if (this.dataType === 'integer') {
      let parsed = Number(this.value);
      //if (!Number.isInteger(this.value)) {
      if (isNaN(parsed)) {
        this.setErrorState();
      } else {
        this.clearErrorState();
      }
    } else if (this.dataType === 'float') {
      let parsed = Number(this.value);
      if (isNaN(parsed)) {
        this.setErrorState();
      } else {
        this.clearErrorState();
      }
    }
  }

  private setErrorState() {
    this.renderer.setStyle(this.validationError.nativeElement, 'display', 'block');
  }
  private clearErrorState() {
    this.renderer.setStyle(this.validationError.nativeElement, 'display', 'none');
  }
}
