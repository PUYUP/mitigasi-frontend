import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommentListComponent } from '../generic/components/comment-list/comment-list.component';
import { HazardDetailComponent } from './components/hazard-detail/hazard-detail.component';

import { ThreatPage } from './threat.page';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: ':hazard_classify',
        children: [
          {
            path: '',
            component: ThreatPage,
          },
          {
            path: ':hazard_uuid',
            children: [
              {
                path: '',
                component: HazardDetailComponent,
              },
              {
                path: 'Comment',
                component: CommentListComponent,
              },
            ],
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
export class ThreatPageRoutingModule {}
