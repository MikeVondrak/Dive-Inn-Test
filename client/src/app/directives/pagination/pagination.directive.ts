// Taken from: https://medium.com/javascript-everyday/angular-paginator-implemented-from-scratch-ccd2dc7e8b4e
// https://stackblitz.com/edit/ng-pagination-wt?file=src%2Fapp%2Fpagination.directive.ts

import {
  Directive,
  OnChanges,
  OnInit,
  SimpleChanges,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  Renderer2,
  HostBinding,
  HostListener
} from "@angular/core";

@Directive({
  selector: "[appPagination]",
  exportAs: "appPagination"
})
export class PaginationDirective implements OnChanges, OnInit {
  @Input() pageNo = 1;
  @Input() totalPages = 1;

  @Output() pageChange = new EventEmitter<number>();

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    // In case no value is passed
    this.setValue(this.pageNo);
  }

  ngOnChanges(simpleChanges: SimpleChanges) {
    // Needs to be checked before pageNo
    if (simpleChanges.totalPages) {
      this.onTotalPagesInput();
    }

    if (simpleChanges.pageNo) {
      this.onPageNoInput();
    }
  }

  @HostListener("input", ["$event.target.value"]) onInput(val) {
    this.setValue(this.getParsedValue(val));
  }

  @HostListener("change", ["$event.target.value"]) onChange(val) {
    if (val === "") {
      this.setValue(1);
    }

    if (this.isOutOfRange(val)) {
      this.setValue(this.totalPages);
    }

    this.pageNo = Number(this.el.nativeElement.value);
    this.pageChange.emit(this.pageNo);
  }

  get isFirst(): boolean {
    return this.pageNo === 1;
  }

  get isLast(): boolean {
    return this.pageNo === this.totalPages;
  }

  first() {
    this.setPage(1);
  }

  prev() {
    this.setPage(Math.max(1, this.pageNo - 1));
  }

  next() {
    this.setPage(Math.min(this.totalPages, this.pageNo + 1));
  }

  last() {
    this.setPage(this.totalPages);
  }

  private setValue(val: string | number) {
    this.renderer.setProperty(this.el.nativeElement, "value", String(val));
  }

  private setPage(val: number) {
    this.pageNo = val;
    this.setValue(this.pageNo);
    this.pageChange.emit(this.pageNo);
  }

  private getParsedValue(val: string): string {
    return val.replace(/(^0)|([^0-9]+$)/, "");
  }

  private isOutOfRange(val: string): boolean {
    return Number(val) > this.totalPages;
  }

  private onTotalPagesInput() {
    if (typeof this.totalPages !== "number") {
      this.totalPages = 1;
    }
    // don't allow totalPages to go to 0 so UI controls are in disabled state and page shows "1/1" when there are no results
    if (this.totalPages === 0) {
      this.totalPages = 1;
    }
  }

  private onPageNoInput() {
    if (
      typeof this.pageNo !== "number" ||
      this.pageNo < 1 ||
      this.pageNo > this.totalPages
    ) {
      this.pageNo = 1;
    }

    this.setValue(this.pageNo);
  }
}
