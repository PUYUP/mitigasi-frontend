import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SecurityPageRoutingModule } from './security-routing.module';

import { SecurityPage } from './security.page';
import { EditorComponent } from 'src/app/person/security/components/editor/editor.component';
import { ChangePasswordComponent } from 'src/app/person/security/components/change-password/change-password.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SecurityPageRoutingModule,
  ],
  declarations: [SecurityPage, EditorComponent, ChangePasswordComponent],
  entryComponents: [EditorComponent, ChangePasswordComponent],
})
export class SecurityPageModule {}
