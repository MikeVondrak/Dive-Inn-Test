import { DOCUMENT } from '@angular/common';
import { ApplicationRef, Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, Inject, Injectable, Injector, Renderer2, RendererFactory2, Type } from '@angular/core';
import { ModalTemplateComponent } from 'src/app/shared/components/modal-template/modal-template.component';
import { ModalConfig } from '../../models/modal.model';

import { AppInjector } from 'src/app/services/app-injector/app-injector.service';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private renderer: Renderer2;

  private body: HTMLElement;
  private modalDialogComponentFactory: ComponentFactory<ModalTemplateComponent>;
  private modalDialogRef: ComponentRef<ModalTemplateComponent>;

  constructor(
    private appRef: ApplicationRef,
    private injector: Injector,
    private rendererFactory: RendererFactory2,
    private componentFactoryResolver: ComponentFactoryResolver,
    @Inject(DOCUMENT) private document: Document,
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
    this.body = this.document.body;
    this.modalDialogComponentFactory = this.componentFactoryResolver.resolveComponentFactory(ModalTemplateComponent);    
  }

  public openModal(config: ModalConfig) {
    //const inj = AppInjector.getInjector();
    const inj = this.injector;
    
    // create the modal content component
    const contentComponentFactory = this.componentFactoryResolver.resolveComponentFactory(config.contentType);
    const contentComponentRef = contentComponentFactory.create(inj);
    const contentNativeEl = contentComponentRef.location.nativeElement;

    // create the modal dialog template with the content component projected into the modal dialog <ng-content>
    this.modalDialogRef = this.modalDialogComponentFactory.create(inj, [[contentNativeEl]]);
    const modalDialogNativeEl = this.modalDialogRef.location.nativeElement;

    // create a refrence to the close function to pass into the modal template to avoid circular reference (from template using modal service)
    const closeCallback = this.closeModal.bind(this);
    config.closeCallback = closeCallback;
    this.modalDialogRef.instance.config = config;

    // this.renderer.addClass(modalDialogNativeEl, 'class-name');
    this.appRef.attachView(this.modalDialogRef.hostView); // attach component to the Angular app and mark as dirty for change detection
    this.renderer.appendChild(this.body, modalDialogNativeEl); // add the component element to the DOM
  
  }

  public closeModal() {
    // detach the modal from the Angular app, will also remove from the DOM
    this.appRef.detachView(this.modalDialogRef.hostView);
  }
}
