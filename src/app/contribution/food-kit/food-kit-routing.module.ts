import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FoodKitPage } from './food-kit.page';

const routes: Routes = [
  {
    path: '',
    component: FoodKitPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FoodKitPageRoutingModule {}
