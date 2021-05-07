import { Component, Input, OnInit } from '@angular/core';
import { FontSetManagerService } from 'src/app/services/font-set-manager/font-set-manager.service';

@Component({
  selector: 'app-content-container',
  templateUrl: './content-container.component.html',
  styleUrls: ['./content-container.component.scss']
})
export class ContentContainerComponent implements OnInit {

  @Input() title: string = 'header';
  // @Input() titleStyle: Observable<>
  // @Input() data: string = 'content data';
  public titleFontInstance$ = this.fontSetManagerService.getFontInstanceForType$('section_title');

  constructor(private fontSetManagerService: FontSetManagerService) { }

  ngOnInit(): void {
  }

}
