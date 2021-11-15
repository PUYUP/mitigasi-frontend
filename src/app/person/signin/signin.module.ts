import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SigninRoutingModule } from './signin-routing.module';
import { SigninComponent } from './signin.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [SigninComponent],
  imports: [
    IonicModule,
    CommonModule,
    SigninRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class SigninModule {}
