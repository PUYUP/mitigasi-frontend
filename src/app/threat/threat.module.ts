import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { FileUploadModule } from 'ng2-file-upload';

import { ThreatPageRoutingModule } from './threat-routing.module';

import { ThreatPage } from './threat.page';
import { HazardDetailComponent } from './components/hazard-detail/hazard-detail.component';
import { HazardDetailMapComponent } from './components/hazard-detail-map/hazard-detail-map.component';
import { CommentEditorComponent } from '../generic/components/comment-editor/comment-editor.component';
import { AutosizeModule } from 'ngx-autosize';
import { CommentListComponent } from '../generic/components/comment-list/comment-list.component';
import { SafetyCheckEditorComponent } from '../generic/components/safetycheck-editor/safetycheck-editor.component';
import { SwiperModule } from 'swiper/angular';
import { SafetyCheckListComponent } from '../generic/components/safetycheck-list/safetycheck-list.component';
import { SafetyCheckListMapComponent } from '../generic/components/safetycheck-list-map/safetycheck-list-map.component';
import { AttachmentImageViewerComponent } from '../shared/attachment-image-viewer/attachment-image-viewer.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ThreatPageRoutingModule,
    SwiperModule,
    AutosizeModule,
    FileUploadModule,
    SharedModule,
  ],
  declarations: [
    ThreatPage,
    HazardDetailComponent,
    HazardDetailMapComponent,
    CommentListComponent,
    SafetyCheckEditorComponent,
    SafetyCheckListComponent,
    SafetyCheckListMapComponent,
    AttachmentImageViewerComponent,
  ],
  entryComponents: [
    HazardDetailComponent,
    HazardDetailMapComponent,
    CommentListComponent,
    SafetyCheckEditorComponent,
    SafetyCheckListComponent,
    SafetyCheckListMapComponent,
    AttachmentImageViewerComponent,
  ],
})
export class ThreatPageModule {}
