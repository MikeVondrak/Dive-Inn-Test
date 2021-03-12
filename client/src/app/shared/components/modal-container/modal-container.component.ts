import { AfterViewInit, Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ModalService } from 'src/app/services/modal/modal.service';

@Component({
  selector: 'app-modal-container',
  templateUrl: './modal-container.component.html',
  styleUrls: ['./modal-container.component.scss']
})
export class ModalContainerComponent implements OnInit, AfterViewInit {

  @ViewChild('modalContainer', { read: ViewContainerRef }) private modalContainerRef: ViewContainerRef;

  constructor(private modalService: ModalService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    // call the modal service and register the viewchild ViewContainerRef
    this.modalService.registerViewContainer(this.modalContainerRef);
  }
}
