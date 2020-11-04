import { Component, Input, OnInit } from '@angular/core';
import { FontSet } from '../../../../models/font-set.model';

@Component({
  selector: 'app-font-set-list',
  templateUrl: './font-set-list.component.html',
  styleUrls: ['./font-set-list.component.scss']
})
export class FontSetListComponent implements OnInit {

  @Input() fontSetList: FontSet[];

  constructor() { }

  ngOnInit(): void {

  }

}
