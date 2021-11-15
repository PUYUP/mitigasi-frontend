import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HazardDetailComponent } from './components/hazard-detail/hazard-detail.component';

import { ThreatPage } from './threat.page';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: ':hazard_classify',
        children: [
          {
            path: '',
            component: ThreatPage,
          },
          {
            path: ':hazard_uuid',
            component: HazardDetailComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ThreatPageRoutingModule {}
