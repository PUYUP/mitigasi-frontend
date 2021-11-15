import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportDetailPageRoutingModule } from './report-detail-routing.module';

import { ReportDetailPage } from './report-detail.page';
import { FloodReportedDetailComponent } from '../../components/flood/flood-reported-detail/flood-reported-detail.component';
import { MapComponent } from '../../components/map/map.component';
import { DroughtReportedDetailComponent } from '../../components/drought/drought-reported-detail/drought-reported-detail.component';
import { EarthquakeReportedDetailComponent } from '../../components/earthquake/earthquake-reported-detail/earthquake-reported-detail.component';
import { LandslideReportedDetailComponent } from '../../components/landslide/landslide-reported-detail/landslide-reported-detail.component';
import { OtherReportedDetailComponent } from '../../components/other/other-reported-detail/other-reported-detail.component';
import { TsunamiReportedDetailComponent } from '../../components/tsunami/tsunami-reported-detail/tsunami-reported-detail.component';
import { VolcanoReportedDetailComponent } from '../../components/volcano/volcano-reported-detail/volcano-reported-detail.component';
import { WildfireReportedDetailComponent } from '../../components/wildfire/wildfire-reported-detail/wildfire-reported-detail.component';
import { WindReportedDetailComponent } from '../../components/wind/wind-reported-detail/wind-reported-detail.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportDetailPageRoutingModule,
  ],
  declarations: [
    ReportDetailPage,
    FloodReportedDetailComponent,
    DroughtReportedDetailComponent,
    EarthquakeReportedDetailComponent,
    LandslideReportedDetailComponent,
    OtherReportedDetailComponent,
    TsunamiReportedDetailComponent,
    VolcanoReportedDetailComponent,
    WildfireReportedDetailComponent,
    WindReportedDetailComponent,
    MapComponent,
  ],
  entryComponents: [MapComponent],
})
export class ReportDetailPageModule {}
