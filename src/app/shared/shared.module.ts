import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SecurecodeValidationComponent } from './securecode-validation/securecode-validation.component';
import { SecurecodeCreateComponent } from './securecode-create/securecode-create.component';
import { SecurecodeValidationDialogComponent } from './securecode-validation-dialog/securecode-validation-dialog.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [
    SecurecodeValidationComponent,
    SecurecodeCreateComponent,
    SecurecodeValidationDialogComponent,
  ],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [
    SecurecodeValidationComponent,
    SecurecodeValidationDialogComponent,
    SecurecodeCreateComponent,
  ],
})
export class SharedModule {}
