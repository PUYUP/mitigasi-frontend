import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { AutosizeModule } from 'ngx-autosize';

import { DisasterPageRoutingModule } from './disaster-routing.module';

import { DisasterPage } from './disaster.page';
import { SendReportComponent } from '../../contribution/report/components/send-report/send-report.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    DisasterPageRoutingModule,
    AutosizeModule,
  ],
  declarations: [DisasterPage, SendReportComponent],
  entryComponents: [SendReportComponent],
})
export class DisasterPageModule {}
