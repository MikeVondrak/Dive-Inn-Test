import { Component, Input, OnInit } from '@angular/core';
import { FontInstance } from 'src/app/models/font-instance.model';

@Component({
  selector: 'app-font-preview-pane',
  templateUrl: './font-preview-pane.component.html',
  styleUrls: ['./font-preview-pane.component.scss']
})
export class FontPreviewPaneComponent implements OnInit {

  @Input() fontInstance: FontInstance;

  constructor() { }

  ngOnInit(): void {
  }

}
