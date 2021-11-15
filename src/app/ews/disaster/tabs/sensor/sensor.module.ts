import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SensorPageRoutingModule } from './sensor-routing.module';

import { SensorPage } from './sensor.page';
import { FloodSensorComponent } from '../../components/flood/flood-sensor/flood-sensor.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SensorPageRoutingModule],
  declarations: [SensorPage, FloodSensorComponent],
  entryComponents: [FloodSensorComponent],
})
export class SensorPageModule {}
