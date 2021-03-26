import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss']
})
export class SearchFilterComponent implements OnInit {

  public searchText: string;

  @Output() searchString = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  public searchTyped(newText: string) {
    this.searchText = newText;
    this.searchString.emit(this.searchText);
  }

}
