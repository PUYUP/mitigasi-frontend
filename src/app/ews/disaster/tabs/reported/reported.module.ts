import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportedPageRoutingModule } from './reported-routing.module';

import { ReportedPage } from './reported.page';
import { FloodReportedComponent } from '../../../../contribution/report/components/flood/flood-reported/flood-reported.component';
import { DroughtReportedComponent } from 'src/app/contribution/report/components/drought/drought-reported/drought-reported.component';
import { EarthquakeReportedComponent } from 'src/app/contribution/report/components/earthquake/earthquake-reported/earthquake-reported.component';
import { LandslideReportedComponent } from 'src/app/contribution/report/components/landslide/landslide-reported/landslide-reported.component';
import { OtherReportedComponent } from 'src/app/contribution/report/components/other/other-reported/other-reported.component';
import { TsunamiReportedComponent } from 'src/app/contribution/report/components/tsunami/tsunami-reported/tsunami-reported.component';
import { VolcanoReportedComponent } from 'src/app/contribution/report/components/volcano/volcano-reported/volcano-reported.component';
import { WildfireReportedComponent } from 'src/app/contribution/report/components/wildfire/wildfire-reported/wildfire-reported.component';
import { WindReportedComponent } from 'src/app/contribution/report/components/wind/wind-reported/wind-reported.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ReportedPageRoutingModule],
  declarations: [
    ReportedPage,
    FloodReportedComponent,
    DroughtReportedComponent,
    EarthquakeReportedComponent,
    LandslideReportedComponent,
    OtherReportedComponent,
    TsunamiReportedComponent,
    VolcanoReportedComponent,
    WildfireReportedComponent,
    WindReportedComponent,
  ],
  entryComponents: [
    FloodReportedComponent,
    DroughtReportedComponent,
    EarthquakeReportedComponent,
    LandslideReportedComponent,
    OtherReportedComponent,
    TsunamiReportedComponent,
    VolcanoReportedComponent,
    WildfireReportedComponent,
    WindReportedComponent,
  ],
})
export class ReportedPageModule {}
