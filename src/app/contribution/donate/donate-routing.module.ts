import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DonatePage } from './donate.page';

const routes: Routes = [
  {
    path: '',
    component: DonatePage,
  },
  {
    path: 'DonatePayment',
    loadChildren: () =>
      import('./pages/donate-payment/donate-payment.module').then(
        (m) => m.DonatePaymentPageModule
      ),
  },
  {
    path: 'DonateDetail',
    loadChildren: () =>
      import('./pages/donate-detail/donate-detail.module').then(
        (m) => m.DonateDetailPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DonatePageRoutingModule {}
