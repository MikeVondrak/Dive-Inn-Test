import { DOCUMENT } from '@angular/common';
import { ApplicationRef, Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, Inject, Injectable, Injector, Renderer2, RendererFactory2, Type, ViewContainerRef } from '@angular/core';
import { ModalTemplateComponent } from 'src/app/shared/components/modal-template/modal-template.component';
import { ModalConfig } from '../../models/modal.model';

import { AppInjector } from 'src/app/services/app-injector/app-injector.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  // private renderer: Renderer2;

  // private body: HTMLElement;
  private modalDialogComponentFactory: ComponentFactory<ModalTemplateComponent>;
  // private modalDialogRef: ComponentRef<ModalTemplateComponent>;

  // private modalContainer: HTMLElement;
  private modalContainerRef: ViewContainerRef;

  public showModal$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private appRef: ApplicationRef,
    private injector: Injector,
    private rendererFactory: RendererFactory2,
    private componentFactoryResolver: ComponentFactoryResolver,
    @Inject(DOCUMENT) private document: Document,
  ) {
    // this.renderer = this.rendererFactory.createRenderer(null, null);
    // this.body = this.document.body;
    this.modalDialogComponentFactory = this.componentFactoryResolver.resolveComponentFactory(ModalTemplateComponent);    
  }

  /**
   * On app init the modal-template-component calls this to register its ViewChild ViewContainerRef
   */
  public registerViewContainer(containerRef: ViewContainerRef) {
    this.modalContainerRef = containerRef;
  }

  /**
   * Display a modal template with title, X, and OK/Cancel buttons plus passed-in content component
   */
  //public open<T>(config: ModalConfig): ComponentRef<T> {
  public open(config: ModalConfig) {
    if (this.modalContainerRef) {

      // create the modal content component
      const contentComponentFactory = this.componentFactoryResolver.resolveComponentFactory(config.contentType);
          
      // create the modal contents and get a reference to the native element
      const contentComponentRef = contentComponentFactory.create(this.injector);
      const contentNativeEl = contentComponentRef.location.nativeElement;
      this.appRef.attachView(contentComponentRef.hostView);
          
      // create the modal dialog template with the content component projected into the modal dialog <ng-content> 
      // - attach component using view container ref and populate config input
      const comp = this.modalContainerRef.createComponent(this.modalDialogComponentFactory, undefined, this.injector, [[contentNativeEl]]);
      // create a refrence to the close function to pass into the modal template to avoid circular reference (from template using modal service)
      const closeCallback = this.close.bind(this);
      config.closeCallback = closeCallback;
      comp.instance.config = config;

      this.showModal$.next(true);
    } else {
      console.log('ERROR: No modalContainerRef when trying to open modal!');
    }
    //return;
  }

  /**
   * Close the modal
   */
  public close() {
    this.showModal$.next(false);
    if (this.modalContainerRef) {
      this.modalContainerRef.remove();
    }
  }

//   public openModal(config: ModalConfig) {
//     //const inj = AppInjector.getInjector();
//     const inj = this.injector;
    
//     // create element on body to contain modal
//     this.modalContainer = document.createElement('div');

//     // create the modal content component
//     const contentComponentFactory = this.componentFactoryResolver.resolveComponentFactory(config.contentType);

//     // bootstrap the modal container element to enable change detection
//     this.appRef.bootstrap(contentComponentFactory, this.modalContainer);
//     // console.log('--------- bootstrap success');

//     // create the modal contents and get a reference to the native element
//     const contentComponentRef = contentComponentFactory.create(inj);
//     const contentNativeEl = contentComponentRef.location.nativeElement;
        
//     // create the modal dialog template with the content component projected into the modal dialog <ng-content>
//     this.modalDialogRef = this.modalDialogComponentFactory.create(inj, [[contentNativeEl]]);

//     const modalDialogNativeEl = this.modalDialogRef.location.nativeElement;

//     // create a refrence to the close function to pass into the modal template to avoid circular reference (from template using modal service)
//     const closeCallback = this.closeModal.bind(this);
//     config.closeCallback = closeCallback;
//     this.modalDialogRef.instance.config = config;


//     // bootstrap the modal container element to enable change detection
//     this.appRef.bootstrap(this.modalDialogComponentFactory, modalDialogNativeEl);
//     console.log('--------- bootstrap success');
    
//     this.appRef.attachView(this.modalDialogRef.hostView); // attach component to the Angular app and mark as dirty for change detection
//     this.renderer.appendChild(this.body, modalDialogNativeEl); // add the component element to the DOM
//   }

//   public closeModal() {
//     // detach the modal from the Angular app, will also remove from the DOM
//     // this.appRef.detachView(this.modalDialogRef.hostView);
//     this.modalDialogRef.destroy();
//   }
}
