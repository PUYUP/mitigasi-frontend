import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommentDetailComponent } from './components/comment-detail/comment-detail.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'Comment',
        children: [
          {
            path: ':comment_uuid',
            component: CommentDetailComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GenericRoutingModule {}
