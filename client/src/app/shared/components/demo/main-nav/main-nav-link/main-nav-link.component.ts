import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FontInstance } from 'src/app/models/font-instance.model';
import { FontSetManagerService } from 'src/app/services/font-set-manager/font-set-manager.service';

enum SignHeightEnum {
  'LOW',
  'HIGH'
}

@Component({
  selector: 'app-main-nav-link',
  templateUrl: './main-nav-link.component.html',
  styleUrls: ['./main-nav-link.component.scss']
})
export class MainNavLinkComponent implements OnInit {

  public signHeightEnum = SignHeightEnum;

  @Input() linkText: string = '';
  @Input() signHeight: SignHeightEnum = SignHeightEnum.LOW;
  @Input() fontSource$: Observable<FontInstance>;

  public fontSource2$: Observable<FontInstance> = this.fontSetManagerService.getFontInstanceForType$('main_nav');

  constructor(private fontSetManagerService: FontSetManagerService) { }

  ngOnInit(): void {
  }

}
