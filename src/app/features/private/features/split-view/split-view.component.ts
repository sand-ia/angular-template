import { Component } from '@angular/core';
import { SplitViewService } from './split-view.service';

@Component({
  selector: 'app-split-view',
  templateUrl: './split-view.component.html',
  styleUrls: ['./split-view.component.scss'],
})
export class SplitViewComponent {
  constructor(private splitViewService: SplitViewService) {}

  setActiveCanvas(route: string): void {
    this.splitViewService.setActiveCanvas(route);
  }
}
