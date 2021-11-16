import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DonatePaymentPage } from './donate-payment.page';

const routes: Routes = [
  {
    path: '',
    component: DonatePaymentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DonatePaymentPageRoutingModule {}
