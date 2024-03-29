import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureARoutingModule } from './feature-a-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { DetailComponent } from './pages/detail/detail.component';
import { CreateComponent } from './pages/create/create.component';
import { ListComponent } from './pages/list/list.component';
import { FeatureAComponent } from './feature-a.component';
import { SplitViewModule } from '../../split-view.module';
import { HttpClientModule } from '@angular/common/http';
import { FeatureAService } from './services/feature-a.service';

@NgModule({
  providers: [FeatureAService],
  declarations: [
    DetailComponent,
    CreateComponent,
    ListComponent,
    FeatureAComponent,
  ],
  imports: [
    CommonModule,
    FeatureARoutingModule,
    HttpClientModule,
    SharedModule,
    SplitViewModule,
  ],
})
export class FeatureAModule {}
