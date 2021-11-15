import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GenericRoutingModule } from './generic-routing.module';
import { CommentDetailComponent } from './components/comment-detail/comment-detail.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [CommonModule, IonicModule, GenericRoutingModule],
  declarations: [CommentDetailComponent],
  entryComponents: [CommentDetailComponent],
})
export class GenericModule {}
