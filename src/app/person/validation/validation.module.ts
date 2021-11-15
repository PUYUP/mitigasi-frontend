import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ValidationRoutingModule } from './validation-routing.module';
import { ValidationComponent } from './validation.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [ValidationComponent],
  imports: [CommonModule, IonicModule, ValidationRoutingModule, SharedModule],
})
export class ValidationModule {}
