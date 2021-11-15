import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DonatePaymentPageRoutingModule } from './donate-payment-routing.module';

import { DonatePaymentPage } from './donate-payment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DonatePaymentPageRoutingModule
  ],
  declarations: [DonatePaymentPage]
})
export class DonatePaymentPageModule {}
