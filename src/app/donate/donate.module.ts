import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DonatePageRoutingModule } from './donate-routing.module';

import { DonatePage } from './donate.page';
import { DonateHistoryComponent } from './components/donate-history/donate-history.component';
import { DonateAmountComponent } from './components/donate-amount/donate-amount.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, DonatePageRoutingModule],
  declarations: [DonatePage, DonateHistoryComponent, DonateAmountComponent],
  entryComponents: [DonateHistoryComponent, DonateAmountComponent],
})
export class DonatePageModule {}
