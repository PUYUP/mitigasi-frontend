import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SecurityRoutingModule } from './security-routing.module';
import { SecurityComponent } from './security.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [SecurityComponent],
  imports: [
    IonicModule,
    CommonModule,
    SecurityRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class SecurityModule {}
