import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActivityPageRoutingModule } from './activity-routing.module';

import { ActivityPage } from './activity.page';
import { HazardListComponent } from './components/hazard-list/hazard-list.component';
import { SafetycheckListComponent } from './components/safetycheck-list/safetycheck-list.component';
import { CommentListComponent } from './components/comment-list/comment-list.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ActivityPageRoutingModule],
  declarations: [
    ActivityPage,
    HazardListComponent,
    SafetycheckListComponent,
    CommentListComponent,
  ],
  entryComponents: [
    HazardListComponent,
    SafetycheckListComponent,
    CommentListComponent,
  ],
})
export class ActivityPageModule {}
