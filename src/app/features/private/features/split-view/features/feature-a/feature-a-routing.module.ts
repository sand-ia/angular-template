import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailComponent } from './pages/detail/detail.component';
import { CreateComponent } from './pages/create/create.component';
import { FeatureAComponent } from './feature-a.component';

const routes: Routes = [
  {
    path: 'feature-c',
    loadChildren: () =>
      import('./features/feature-c/feature-c.module').then(
        m => m.FeatureCModule
      ),
  },
  {
    path: '',
    component: FeatureAComponent,
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
export class FeatureARoutingModule {}
