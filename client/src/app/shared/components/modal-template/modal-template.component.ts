import { NgTemplateOutlet } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ModalConfig } from 'src/app/models/modal.model';
import { ModalService } from 'src/app/services/modal/modal.service';
import { setContentValid } from 'src/app/store/modal/actions/modal.actions';
import { isModalContentValid } from 'src/app/store/modal/selectors/modal.selectors';
import { AppState } from 'src/app/store/state';

@Component({
  selector: 'app-modal-template',
  templateUrl: './modal-template.component.html',
  styleUrls: ['./modal-template.component.scss']
})
export class ModalTemplateComponent implements OnInit, OnDestroy {

  private isContentValid: Observable<boolean> = this.store$.select(isModalContentValid);

  private destroy$: Subject<void> = new Subject<void>();

  //private sub: Subscription;
  

  // @HostListener('click', ['$event']) handleModalBgClick(event: Event) {
  //   console.log("Modal BG Click");
  //   debugger;
  // }
  
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>(); 
  
  // "input" set programatically by modal service
  public config: ModalConfig;
  // template access
  public modalTitle: string = '';
  
  constructor(
    private store$: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.modalTitle = this.config?.title;    
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.store$.dispatch(setContentValid({ valid: false }));
    //this.sub.unsubscribe();
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
    
    // ok button does nothing if store returns false
    this.isContentValid.pipe(takeUntil(this.destroy$)).subscribe(validFlag => {
      if (validFlag === false) {
        return;
      } else {
        this.store$.dispatch(this.config.primaryAction);
        this.config.closeCallback();
      }
    })
  }
}
