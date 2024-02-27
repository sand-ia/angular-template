import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SplitViewRoutingModule } from './split-view-routing.module';
import { SplitViewComponent } from './split-view.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CanvasComponent } from './components/canvas/canvas.component';

@NgModule({
  declarations: [SplitViewComponent, CanvasComponent],
  imports: [CommonModule, SplitViewRoutingModule, SharedModule],
})
export class SplitViewModule {}
