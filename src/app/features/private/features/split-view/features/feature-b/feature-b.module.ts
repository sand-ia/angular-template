import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureBComponent } from './feature-b.component';
import { FeatureBRoutingModule } from './feature-b-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SplitViewModule } from '../../split-view.module';
import { ListComponent } from './components/list/list.component';
import { DetailComponent } from './components/detail/detail.component';
import { CreateComponent } from './components/create/create.component';

@NgModule({
  declarations: [
    FeatureBComponent,
    ListComponent,
    DetailComponent,
    CreateComponent,
  ],
  imports: [CommonModule, FeatureBRoutingModule, SharedModule, SplitViewModule],
})
export class FeatureBModule {}
