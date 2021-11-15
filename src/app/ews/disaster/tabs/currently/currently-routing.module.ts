import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CurrentlyPage } from './currently.page';

const routes: Routes = [
  {
    path: '',
    component: CurrentlyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CurrentlyPageRoutingModule {}
