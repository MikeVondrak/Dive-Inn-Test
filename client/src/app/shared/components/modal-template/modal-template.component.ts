import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal-template',
  templateUrl: './modal-template.component.html',
  styleUrls: ['./modal-template.component.scss']
})
export class ModalTemplateComponent implements OnInit {

  // @HostListener('click', ['$event']) handleModalBgClick(event: Event) {
  //   console.log("Modal BG Click");
  //   debugger;
  // }

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  public modalBgClick() {
    this.closeModal.emit();
  }

  public modalWindowClick($event) {
    event.stopPropagation();
  }

  public modalCloseButtonClick($event) {
    event.stopPropagation();
    this.closeModal.emit();
  }

}
