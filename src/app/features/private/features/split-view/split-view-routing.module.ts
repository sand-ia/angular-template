import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SplitViewComponent } from './split-view.component';

const routes: Routes = [
  {
    path: '',
    component: SplitViewComponent,
    children: [
      { path: '', redirectTo: 'feature-a', pathMatch: 'full' },
      {
        path: 'feature-a',
        loadChildren: () =>
          import('./features/feature-a/feature-a.module').then(
            m => m.FeatureAModule
          ),
      },
      {
        path: 'feature-b',
        loadChildren: () =>
          import('./features/feature-b/feature-b.module').then(
            m => m.FeatureBModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SplitViewRoutingModule {}
