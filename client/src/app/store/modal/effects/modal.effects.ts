import { ComponentFactoryResolver, Injectable, Injector, Renderer2, RendererFactory2 } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { concatMap, tap } from 'rxjs/operators';

import { openModal, closeModal } from '../actions/modal.actions';


@Injectable()
export class ModalEffects {

  private renderer: Renderer2;

  openModal$ = createEffect(() => {
    return this.actions$.pipe( 

      ofType(openModal),
      tap((action) => {
        console.log('openModal');
        const contentComponentFactory = this.componentFactoryResolver.resolveComponentFactory(action.contentType);
        const contentComponentRef = contentComponentFactory.create(this.injector);
      })
    );
  },
  {dispatch: false}
  );


  constructor(
    private actions$: Actions,
    private injector: Injector,
    private rendererFactory: RendererFactory2,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

}
