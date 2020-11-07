import { Component, Input, OnInit } from '@angular/core';
import { LoggerService } from 'src/app/services/logger/logger.service';
import { FontSet } from '../../../../models/font-set.model';

@Component({
  selector: 'app-font-set-list',
  templateUrl: './font-set-list.component.html',
  styleUrls: ['./font-set-list.component.scss']
})
export class FontSetListComponent implements OnInit {

  @Input() fontSetList: FontSet[];

  constructor(private loggerService: LoggerService) {
    this.loggerService.enableLogger(true);
   }

  ngOnInit(): void {

  }

  removeFontSet(fontSet) {
    this.loggerService.log('removeFontSet: ' + fontSet.name);
  }

}
