import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SplitViewRoutingModule } from './split-view-routing.module';
import { SplitViewComponent } from './split-view.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CanvasComponent } from './components/canvas/canvas.component';
import { InspectorComponent } from './components/inspector/inspector.component';

@NgModule({
  declarations: [SplitViewComponent, CanvasComponent, InspectorComponent],
  imports: [CommonModule, SplitViewRoutingModule, SharedModule],
  exports: [CanvasComponent, InspectorComponent],
})
export class SplitViewModule {}
