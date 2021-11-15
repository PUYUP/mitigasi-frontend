import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommentPage } from './comment.page';

const routes: Routes = [
  {
    path: ':applied_model',
    children: [
      {
        path: '',
        children: [
          {
            path: ':applied_uuid',
            component: CommentPage,
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
export class CommentPageRoutingModule {}
