import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommentPageRoutingModule } from './comment-routing.module';

import { CommentPage } from './comment.page';
import { SendCommentComponent } from './components/send-comment/send-comment.component';
import { AutosizeModule } from 'ngx-autosize';
import { CommentListComponent } from './components/comment-list/comment-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CommentPageRoutingModule,
    AutosizeModule,
  ],
  declarations: [CommentPage, SendCommentComponent, CommentListComponent],
  entryComponents: [SendCommentComponent, CommentListComponent],
})
export class CommentPageModule {}
