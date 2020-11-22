import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FontInstance } from 'src/app/models/font-instance.model';
import { FontTypeInstanceKvp } from 'src/app/models/font-type.model';

@Component({
  selector: 'app-font-type-instance-loader',
  templateUrl: './font-type-instance-loader.component.html',
  styleUrls: ['./font-type-instance-loader.component.scss']
})
export class FontTypeInstanceLoaderComponent implements OnInit {

  @Input() fontTypeInstanceKvp: FontTypeInstanceKvp;
  @Input() displayText: string;

  @Output() upClicked: EventEmitter<FontTypeInstanceKvp> = new EventEmitter<FontTypeInstanceKvp>();
  @Output() downClicked: EventEmitter<FontTypeInstanceKvp> = new EventEmitter<FontTypeInstanceKvp>();

  constructor() { }

  ngOnInit(): void {
  }

  public upClick() {
    this.upClicked.emit(this.fontTypeInstanceKvp);
  }

  public downClick() {
    this.downClicked.emit(this.fontTypeInstanceKvp);
  }

}
