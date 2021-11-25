import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SensorPageRoutingModule } from './sensor-routing.module';

import { SensorPage } from './sensor.page';
import { FloodSensorListComponent } from './components/flood-sensor-list/flood-sensor-list.component';
import { FloodSensorDetailComponent } from './components/flood-sensor-detail/flood-sensor-detail.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SensorPageRoutingModule],
  declarations: [
    SensorPage,
    FloodSensorListComponent,
    FloodSensorDetailComponent,
  ],
  entryComponents: [FloodSensorListComponent],
})
export class SensorPageModule {}
