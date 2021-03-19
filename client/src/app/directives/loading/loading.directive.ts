import { ComponentFactory, ComponentFactoryResolver, ComponentRef, Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { LoadingIndicatorComponent } from '../../shared/components/loading-indicator/loading-indicator.component';

@Directive({
  selector: '[loading]'
})
export class LoadingDirective {
  private loadingComponentFactory: ComponentFactory<LoadingIndicatorComponent>;
  private loadingComponentRef: ComponentRef<LoadingIndicatorComponent>;

  @Input() 
  set loading(loading: boolean) {
    this.vcRef.clear();

    if (loading)
    {
      // create and embed an instance of the loading component
      this.loadingComponentRef = this.vcRef.createComponent(this.loadingComponentFactory);
    }
    else
    {
      // embed the contents of the host template
      this.vcRef.createEmbeddedView(this.templateRef);
    }    
  }

  constructor(
    private templateRef: TemplateRef<any>, 
    private vcRef: ViewContainerRef, 
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    // Create resolver for loading component
    this.loadingComponentFactory = this.componentFactoryResolver.resolveComponentFactory(LoadingIndicatorComponent);
  }

}
