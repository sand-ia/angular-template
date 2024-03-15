import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ModalService } from './modal.service';
import { ServerErrorModalComponent } from './server-error-modal/server-error-modal.component';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements AfterViewInit {
  @ViewChild('container', { read: ViewContainerRef })
  container!: ViewContainerRef;
  componentRef?: ComponentRef<ServerErrorModalComponent>;

  constructor(
    private resolver: ComponentFactoryResolver,
    public modalService: ModalService
  ) {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.createComponent();
    });
  }

  createComponent(): void {
    const componentFactory = this.resolver.resolveComponentFactory(
      ServerErrorModalComponent
    );
    this.componentRef = this.container.createComponent(componentFactory);
  }

  onClick(): void {
    this.modalService.setActiveModal(null);
  }
}
