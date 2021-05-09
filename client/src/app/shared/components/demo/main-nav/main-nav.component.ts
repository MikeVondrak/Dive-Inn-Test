import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FontInstance } from 'src/app/models/font-instance.model';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit {

  @Input() links: string[];
  @Input() fontSource$: Observable<FontInstance>;

  constructor() { }

  ngOnInit(): void {
  }

}
