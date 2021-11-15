import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DisasterDetailPage } from './disaster-detail.page';

const routes: Routes = [
  {
    path: ':identifier_id',
    children: [
      {
        path: '',
        children: [
          {
            path: 'Currently',
            children: [
              {
                path: '',
                children: [
                  {
                    path: ':disaster_uuid',
                    component: DisasterDetailPage,
                  },
                ],
              },
            ],
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
export class DisasterDetailPageRoutingModule {}
