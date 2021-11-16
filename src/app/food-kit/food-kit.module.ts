import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FoodKitPageRoutingModule } from './food-kit-routing.module';

import { FoodKitPage } from './food-kit.page';
import { FoodListComponent } from './components/food-list/food-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    FoodKitPageRoutingModule,
  ],
  declarations: [FoodKitPage, FoodListComponent],
  entryComponents: [FoodListComponent],
})
export class FoodKitPageModule {}
