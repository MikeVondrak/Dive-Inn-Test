import { NgTemplateOutlet } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, HostListener, Input, OnInit, Output, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ModalConfig } from 'src/app/models/modal.model';
import { ModalService } from 'src/app/services/modal/modal.service';
import { modalContent, modalTitle } from 'src/app/store/modal/selectors/modal.selectors';
import { AppState } from 'src/app/store/state';

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
  
  public config: ModalConfig;
  // template access
  public modalTitle: string = '';
  
  // public modalContentOutlet: TemplateRef<HTMLElement>;

  constructor(
    private store$: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.modalTitle = this.config?.title;    
  }

  public modalBgClick() {
    this.config.closeCallback();
  }

  public modalWindowClick($event) {
    event.stopPropagation();
  }

  public modalCloseButtonClick($event) {
    event.stopPropagation();
    this.config.closeCallback();
  }

  public okButtonClick($event) {
    event.stopPropagation();
    
    this.store$.dispatch(this.config.primaryAction);
    
    this.config.closeCallback();
  }

}
