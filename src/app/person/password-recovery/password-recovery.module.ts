import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PasswordRecoveryRoutingModule } from './password-recovery-routing.module';
import { PasswordRecoveryComponent } from './password-recovery.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [PasswordRecoveryComponent],
  imports: [
    IonicModule,
    CommonModule,
    PasswordRecoveryRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class PasswordRecoveryModule {}
