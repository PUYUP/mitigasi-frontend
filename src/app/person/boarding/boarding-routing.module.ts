import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardingComponent } from './boarding.component';

const routes: Routes = [
  {
    path: '',
    component: BoardingComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoardingRoutingModule {}
