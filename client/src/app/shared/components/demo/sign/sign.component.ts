import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.scss']
})
export class SignComponent implements OnInit {

  @Input() navSign: string;

  constructor() { }

  ngOnInit(): void {
  }

}
