import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureCRoutingModule } from './feature-c-routing.module';
import { FeatureCComponent } from './feature-c.component';
import { SplitViewModule } from '../../../../split-view.module';

@NgModule({
  declarations: [FeatureCComponent],
  imports: [CommonModule, FeatureCRoutingModule, SplitViewModule],
})
export class FeatureCModule {}
