import { AfterViewInit, Component, OnInit } from '@angular/core';
import { SplitViewService } from '../../split-view.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss'],
})
export class CanvasComponent implements OnInit, AfterViewInit {
  isCanvasVisible: boolean = false;

  constructor(private splitViewService: SplitViewService) {}

  ngOnInit(): void {
    this.splitViewService.activeCanvas$.subscribe(
      () => (this.isCanvasVisible = false)
    );
  }

  ngAfterViewInit(): void {
    setTimeout(() => (this.isCanvasVisible = true), 0);
  }
}
