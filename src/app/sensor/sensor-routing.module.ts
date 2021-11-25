import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FloodSensorDetailComponent } from './components/flood-sensor-detail/flood-sensor-detail.component';

import { SensorPage } from './sensor.page';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: SensorPage,
      },
      {
        path: 'Detail',
        component: FloodSensorDetailComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SensorPageRoutingModule {}
