import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DonateDetailPageRoutingModule } from './donate-detail-routing.module';

import { DonateDetailPage } from './donate-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DonateDetailPageRoutingModule
  ],
  declarations: [DonateDetailPage]
})
export class DonateDetailPageModule {}
