import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SensorDetailPage } from './sensor-detail.page';

const routes: Routes = [
  {
    path: ':identifier_id',
    children: [
      {
        path: '',
        children: [
          {
            path: 'Sensor',
            children: [
              {
                path: '',
                children: [
                  {
                    path: ':sensor_uuid',
                    component: SensorDetailPage,
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
export class SensorDetailPageRoutingModule {}
