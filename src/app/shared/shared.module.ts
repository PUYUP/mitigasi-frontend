import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SecurecodeValidationComponent } from './securecode-validation/securecode-validation.component';
import { SecurecodeCreateComponent } from './securecode-create/securecode-create.component';
import { SecurecodeValidationDialogComponent } from './securecode-validation-dialog/securecode-validation-dialog.component';
import { IonicModule } from '@ionic/angular';
import { HazardEditorMapComponent } from '../threat/components/hazard-editor-map/hazard-editor-map.component';
import { CommentEditorComponent } from '../generic/components/comment-editor/comment-editor.component';
import { AutosizeModule } from 'ngx-autosize';

@NgModule({
  declarations: [
    SecurecodeValidationComponent,
    SecurecodeCreateComponent,
    SecurecodeValidationDialogComponent,
    HazardEditorMapComponent,
    CommentEditorComponent,
  ],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AutosizeModule,
  ],
  exports: [
    SecurecodeValidationComponent,
    SecurecodeValidationDialogComponent,
    SecurecodeCreateComponent,
    HazardEditorMapComponent,
    CommentEditorComponent,
  ],
  entryComponents: [HazardEditorMapComponent, CommentEditorComponent],
})
export class SharedModule {}
