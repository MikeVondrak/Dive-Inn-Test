import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FontInstance } from 'src/app/models/font-instance.model';

@Component({
  selector: 'app-font-type-instance-loader',
  templateUrl: './font-type-instance-loader.component.html',
  styleUrls: ['./font-type-instance-loader.component.scss']
})
export class FontTypeInstanceLoaderComponent implements OnInit {

  @Input() fontInstance: FontInstance;
  @Input() previewText: string;

  @Output() upClicked: EventEmitter<void> = new EventEmitter<void>();
  @Output() downClicked: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  public upClick() {
    this.upClicked.emit();
  }

  public downClick() {
    this.downClicked.emit();
  }

}
