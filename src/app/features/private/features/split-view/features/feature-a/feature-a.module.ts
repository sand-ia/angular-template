import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureARoutingModule } from './feature-a-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { DetailComponent } from './pages/detail/detail.component';
import { CreateComponent } from './pages/create/create.component';
import { ListComponent } from './pages/list/list.component';

@NgModule({
  declarations: [DetailComponent, CreateComponent, ListComponent],
  imports: [CommonModule, FeatureARoutingModule, SharedModule],
})
export class FeatureAModule {}
