import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DisasterDetailPageRoutingModule } from './disaster-detail-routing.module';

import { DisasterDetailPage } from './disaster-detail.page';
import { FloodCurrentlyDetailComponent } from '../../components/flood/flood-currently-detail/flood-currently-detail.component';
import { SafetyCheckComponent } from '../../components/safety-check/safety-check.component';
import { LandslideCurrentlyDetailComponent } from '../../components/landslide/landslide-currently-detail/landslide-currently-detail.component';
import { EarthquakeCurrentlyDetailComponent } from '../../components/earthquake/earthquake-currently-detail/earthquake-currently-detail.component';
import { TsunamiCurrentlyDetailComponent } from '../../components/tsunami/tsunami-currently-detail/tsunami-currently-detail.component';
import { WindCurrentlyDetailComponent } from '../../components/wind/wind-currently-detail/wind-currently-detail.component';
import { VolcanoCurrentlyDetailComponent } from '../../components/volcano/volcano-currently-detail/volcano-currently-detail.component';
import { WildfireCurrentlyDetailComponent } from '../../components/wildfire/wildfire-currently-detail/wildfire-currently-detail.component';
import { DroughtCurrentlyDetailComponent } from '../../components/drought/drought-currently-detail/drought-currently-detail.component';
import { OtherCurrentlyDetailComponent } from '../../components/other/other-currently-detail/other-currently-detail.component';
import { MapComponent } from '../../components/map/map.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    DisasterDetailPageRoutingModule,
  ],
  declarations: [
    DisasterDetailPage,
    FloodCurrentlyDetailComponent,
    LandslideCurrentlyDetailComponent,
    EarthquakeCurrentlyDetailComponent,
    TsunamiCurrentlyDetailComponent,
    WindCurrentlyDetailComponent,
    VolcanoCurrentlyDetailComponent,
    WildfireCurrentlyDetailComponent,
    DroughtCurrentlyDetailComponent,
    OtherCurrentlyDetailComponent,
    MapComponent,
    SafetyCheckComponent,
  ],
  entryComponents: [SafetyCheckComponent],
})
export class DisasterDetailPageModule {}
