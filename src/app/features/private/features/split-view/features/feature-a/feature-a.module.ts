import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureARoutingModule } from './feature-a-routing.module';
import { FeatureAComponent } from './feature-a.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DetailComponent } from './pages/detail/detail.component';
import { CreateComponent } from './pages/create/create.component';

@NgModule({
  declarations: [FeatureAComponent, DetailComponent, CreateComponent],
  imports: [CommonModule, FeatureARoutingModule, SharedModule],
})
export class FeatureAModule {}
