import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeatureBComponent } from './feature-b.component';
import { CreateComponent } from './components/create/create.component';
import { DetailComponent } from './components/detail/detail.component';

const routes: Routes = [
  {
    path: '',
    component: FeatureBComponent,
    children: [
      {
        path: 'create',
        component: CreateComponent,
      },
      {
        path: ':id',
        component: DetailComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeatureBRoutingModule {}
