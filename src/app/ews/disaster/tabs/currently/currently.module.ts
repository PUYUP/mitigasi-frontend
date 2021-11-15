import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CurrentlyPageRoutingModule } from './currently-routing.module';
import { CurrentlyPage } from './currently.page';
import { FloodCurrentlyComponent } from '../../components/flood/flood-currently/flood-currently.component';
import { LandslideCurrentlyComponent } from '../../components/landslide/landslide-currently/landslide-currently.component';
import { EarthquakeCurrentlyComponent } from '../../components/earthquake/earthquake-currently/earthquake-currently.component';
import { TsunamiCurrentlyComponent } from '../../components/tsunami/tsunami-currently/tsunami-currently.component';
import { WindCurrentlyComponent } from '../../components/wind/wind-currently/wind-currently.component';
import { VolcanoCurrentlyComponent } from '../../components/volcano/volcano-currently/volcano-currently.component';
import { WildfireCurrentlyComponent } from '../../components/wildfire/wildfire-currently/wildfire-currently.component';
import { DroughtCurrentlyComponent } from '../../components/drought/drought-currently/drought-currently.component';
import { OtherCurrentlyComponent } from '../../components/other/other-currently/other-currently.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    IonicModule,
    CurrentlyPageRoutingModule,
  ],
  declarations: [
    CurrentlyPage,
    FloodCurrentlyComponent,
    LandslideCurrentlyComponent,
    EarthquakeCurrentlyComponent,
    TsunamiCurrentlyComponent,
    WindCurrentlyComponent,
    WildfireCurrentlyComponent,
    DroughtCurrentlyComponent,
    VolcanoCurrentlyComponent,
    OtherCurrentlyComponent,
  ],
})
export class CurrentlyPageModule {}
