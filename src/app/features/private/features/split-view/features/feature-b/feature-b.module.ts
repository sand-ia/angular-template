import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureBComponent } from './feature-b.component';
import { FeatureBRoutingModule } from './feature-b-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [FeatureBComponent],
  imports: [CommonModule, FeatureBRoutingModule, SharedModule],
})
export class FeatureBModule {}
