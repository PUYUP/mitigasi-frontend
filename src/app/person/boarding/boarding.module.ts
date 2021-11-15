import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardingRoutingModule } from './boarding-routing.module';
import { BoardingComponent } from './boarding.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [BoardingComponent],
  imports: [CommonModule, IonicModule, BoardingRoutingModule, SharedModule],
})
export class BoardingModule {}
