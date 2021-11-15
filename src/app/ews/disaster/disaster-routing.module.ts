import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DisasterPage } from './disaster.page';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: ':identifier_id',
        component: DisasterPage,
        children: [
          {
            path: '',
            redirectTo: 'Reported',
            pathMatch: 'full',
          },
          {
            path: '',
            children: [
              {
                path: 'Sensor',
                loadChildren: () =>
                  import('./tabs/sensor/sensor.module').then(
                    (m) => m.SensorPageModule
                  ),
              },
            ],
          },
          {
            path: '',
            children: [
              {
                path: 'Currently',
                loadChildren: () =>
                  import('./tabs/currently/currently.module').then(
                    (m) => m.CurrentlyPageModule
                  ),
              },
            ],
          },
          {
            path: '',
            children: [
              {
                path: 'Reported',
                loadChildren: () =>
                  import('./tabs/reported/reported.module').then(
                    (m) => m.ReportedPageModule
                  ),
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: '',
    loadChildren: () =>
      import('./pages/disaster-detail/disaster-detail.module').then(
        (m) => m.DisasterDetailPageModule
      ),
  },
  {
    path: '',
    loadChildren: () =>
      import('./pages/sensor-detail/sensor-detail.module').then(
        (m) => m.SensorDetailPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DisasterPageRoutingModule {}
