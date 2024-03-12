import { AfterViewInit, Component, OnInit } from '@angular/core';
import { SplitViewService } from '../../split-view.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss'],
})
export class CanvasComponent implements OnInit, AfterViewInit {
  isCanvasContentVisible: boolean = false;
  private activeCanvas!: string;

  constructor(public splitViewService: SplitViewService) {}

  ngOnInit(): void {
    this.splitViewService.activeCanvas$.subscribe(activeCanvas => {
      if (this.activeCanvas != activeCanvas)
        this.isCanvasContentVisible = false;
      this.activeCanvas = activeCanvas;
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => (this.isCanvasContentVisible = true), 0);
  }
}
